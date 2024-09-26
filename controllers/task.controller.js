const db = require('../models');
const Task = db.tasks;
const User = db.users;

exports.createTask = async (req, res) => {
    const { title, description, status, urId } = req.body;

    if (!title || !userId) {
        return res.status(400).json({ message: 'Title and User ID are required.' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = await Task.create({ title, description, status, user_id: userId });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id, {
            include: [{ model: User, attributes: ['id', 'username', 'role'] }]
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, userId } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        if (userId) {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Assigned user not found' });
            }
            task.user_id = userId;
        }

        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllTasks = async (req, res) => {
    let { page, size, status, sortBy, order } = req.query;
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    order = order || 'ASC'; 
    sortBy = sortBy || 'id'; 

    let condition = {};
    if (status) {
        condition.status = status;
    }

    try {
        const tasks = await Task.findAndCountAll({
            where: condition,
            limit,
            offset,
            order: [[sortBy, order]],
            include: [{ model: User, attributes: ['id', 'username'] }]
        });

        res.status(200).json({
            totalItems: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: page ? +page : 1,
            tasks: tasks.rows
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.assignTaskToUser = async (req, res) => {
    const { taskId, userId } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        task.user_id = userId;
        await task.save();

        res.status(200).json({ message: `Task ${taskId} assigned to user ${userId}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getTasksByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: [{ model: Task }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

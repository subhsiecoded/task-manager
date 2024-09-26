const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

router.post('/', [verifyToken], taskController.createTask);

router.get('/', [verifyToken], taskController.getAllTasks);

router.get('/:id', [verifyToken], taskController.getTask);

router.put('/:id', [verifyToken], taskController.updateTask);

router.delete('/:id', [verifyToken, isAdmin], taskController.deleteTask);

router.post('/assign', [verifyToken, isAdmin], taskController.assignTaskToUser);

router.get('/user/:userId', [verifyToken], taskController.getTasksByUser);

module.exports = router;

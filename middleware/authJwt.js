const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).send({ message: 'Requires Admin Role!' });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

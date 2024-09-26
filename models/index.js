const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.tasks = require('./task.model')(sequelize, Sequelize);

db.users.hasMany(db.tasks, { foreignKey: 'user_id' });
db.tasks.belongsTo(db.users, { foreignKey: 'user_id' });

module.exports = db;

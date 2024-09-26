require('dotenv').config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD_DB,
    DB: process.env.DB_NAME,
    dialect: 'mysql'
};

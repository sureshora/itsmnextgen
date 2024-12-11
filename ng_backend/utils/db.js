const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_FILE || './itsm-database.sqlite',
    logging: false,
});

module.exports = db;

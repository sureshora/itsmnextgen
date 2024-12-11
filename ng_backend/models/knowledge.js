const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Knowledge = db.define('Knowledge', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    tags: { type: DataTypes.STRING }, // Comma-separated tags
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Knowledge;

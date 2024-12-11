const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Request = db.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    requested_by: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requested_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    change_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority: {
        type: DataTypes.STRING,
    },
    impact: {
        type: DataTypes.STRING,
    },
    risk_level: {
        type: DataTypes.STRING,
    },
    planned_start_date: {
        type: DataTypes.DATE,
    },
    planned_end_date: {
        type: DataTypes.DATE,
    },
    implementation_plan: {
        type: DataTypes.TEXT,
    },
    backout_plan: {
        type: DataTypes.TEXT,
    },
    approvers: {
        type: DataTypes.STRING,
    },
    affected_services: {
        type: DataTypes.STRING,
    },
    change_status: {
        type: DataTypes.STRING,
        defaultValue: 'New',
    },
}, {
    timestamps: true, // Includes createdAt and updatedAt
    tableName: 'Requests', // Table name in the database
});

module.exports = Request;

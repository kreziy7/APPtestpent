const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resume = sequelize.define('Resume', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        defaultValue: 'default_student',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    education: {
        type: DataTypes.TEXT,
    },
    experience: {
        type: DataTypes.TEXT,
    },
    skills: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
});

module.exports = Resume;

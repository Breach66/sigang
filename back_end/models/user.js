const sequelize = require('../config/database')
const { DataTypes } = require('sequelize')
const User = sequelize.define('User', {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
         defaultValue: 'user'
        
    }

})
module.exports = User
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(400),
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'store_owner'),
    defaultValue: 'user',
  },
});

module.exports = User;

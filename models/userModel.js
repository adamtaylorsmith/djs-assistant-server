const {DataTypes} = require('sequelize');
const db = require('../db');

// STRETCH email input == string@string.string
const User = db.define('user', {
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // isAdmin: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false
  // }
});

module.exports = User;
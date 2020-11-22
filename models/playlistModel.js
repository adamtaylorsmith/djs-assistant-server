const {DataTypes} = require('sequelize');
const db = require('../db');

const Playlist = db.define('playlist', {
  playlist_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Playlist;
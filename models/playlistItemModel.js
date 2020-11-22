const {DataTypes} = require('sequelize');
const db = require('../db');

const PlaylistItem = db.define('playlistItem', {
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bpm: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  playlist_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = PlaylistItem;
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
    type: DataTypes.STRING,
    allowNull: false
  },
  length: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bpm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  loud: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  key: {
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
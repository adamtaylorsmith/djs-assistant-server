//const {Router, response} = require('express');
const {Playlist} = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
//const {User} = require('../models');
// const sequelize = require('../db');
//const Playlist = require('../models/playlistModel');

const PlaylistController = Router();

PlaylistController.route('/')
  .get(async (req, res) => { 
    try {
      const playlists = await Playlist.findAll({
        where: {
          owner_id: req.user.id 
        }
      });
      if (playlists) {
        res.status(200).json({
          result: playlists
        });
      } else {
        res.status(404).json({
          message: "Sorry no playlists found for user"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve playlists for user"
      });
    }
  })
  .post(async(req, res) => {
    const playlist = req.body.playlist_id;
    try {
      await Playlist.create({
        playlist_id: playlist,
        owner_id: req.user.id,
      });
      if (playlist) {
        res.status(200).json({
          message: "Playlist entry created hooray!",
        });
      } else {
        res.status(404).json({
          message: "Sorry no playlists found for user"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to create entry son"
      });
    }
  })
  .delete(async(req,res) => {
    const data = req.body.id
    try { 
      const toRemove = await Playlist.findOne({ 
        where: {
          id: data,
          // owner_id: req.user.id
        }
      });    
      toRemove
        ? toRemove.destroy()
        : res.status(404).json({
          message: "FAILED SON"
        });
      res.status(200).json({
        message: "Playlist ID DESTROYED sON!",
      })
    } catch (e) {
      res.status(500).json({
        message: "SUPER FAIL"
      })
    }
  })
  .put(async(req,res) => {
    //console.log(req.params.id)
    const playlistId = req.body.playlist_id;
    const location = req.body.id;
    try {
      const toUpdate = await Playlist.findOne({ 
        where: {
          id: location,
          //owner_id: req.user.id
        }
      })
      if (toUpdate) {
        toUpdate.playlist_id = playlistId;
        await toUpdate.save();
        res.status(200).json({
          message: "Playlist name changed hooray!",
        })
      } else {
        res.status(404).json({ 
          message: "FAILED SON"
        })
      }
    } catch (error) {
      res.status(500).json({
        message: "SUPER FAIL"
      })
    }
  }); 

module.exports = PlaylistController;
//const {Router, response} = require('express');
const {PlaylistItem} = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
//const {User} = require('../models');
// const sequelize = require('../db');
// const PlaylistItem = require('../models/playlistItemModel');

const PlaylistItemController = Router();

PlaylistItemController.route('/:id')
  .get(async(req, res) => { 
    try {
      const owner = req.user.id;
      const playlist = req.params.id;
      const items = await PlaylistItem.findAll({
      where: {
        owner_id: owner,
        playlist_id: playlist}
      }); 
      if (items) {
        res.status(200).json({
          result: items
        });
      } else {
        res.status(404).json({
          message: "No playlist found for user"
        });
      }
    } catch (error) {
        res.status(500).json({
          message: "Failed to retrieve playlist for user"
        });
     }
  })
  .post(async(req, res) => {
    let artist = req.body.artist;
    let title = req.body.title;
    let year = req.body.year;
    let length = req.body.length;
    let bpm = req.body.bpm;
    let video = req.body.video;
    let loud = req.body.loud;
    let meter = req.body.meter;
    let image = req.body.image;
    let key = req.body.key;
    let playlistId = req.params.id;
    let owner = req.user.id;
    try {
      const items = await PlaylistItem.create({
        artist: artist,
        title: title,
        year: year,
        length: length,
        bpm: bpm,
        video: video,
        loud: loud,
        meter: meter,
        image: image,
        key: key,
        playlist_id: playlistId,
        owner_id: owner
      })
      if (items) {
        res.status(200).json({
          message: "Playlist entry created son!!!",
          results: items
        });
      } else {
        res.status(404).json({
          message: "Failed to create entry"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to create entry"
      });
    }
    // function createError(err) {
    //   res.send(500, err.message);
    // }
  })
  .delete(async(req,res) => {
    console.log(req.user.id)
    const data = req.body.id;
    const location = req.params.id;
    const owner = req.user.id;
    try { 
      const toRemove = await Playlist.findOne({ 
        where: {
          id: data,
          playlist_id: location,
          owner_id: owner
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

  // .delete(async (req, res) => {
  //   const owner = req.user.id;
  //   const playlist = req.params.id;
  //   const data = req.body.id;
  //   try {
  //     const toRemove = await PlaylistItem.findOne({
  //       where: {
  //         playlist_id: playlist,
  //         owner_id: owner,
  //         id: data
  //       },
  //     });
  //     toRemove
  //       ? toRemove.destroy()
  //       : res.status(404).json({
  //         message: "Entry not found or entry does not belong to user",
  //       });
  //     res.status(200).json({
  //       message: "Successfully removed entry",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Failed to delete entry",
  //     });
  //   }
  // });

  // PlaylistItemController.route('/:id')
  // .put(async (req, res) => {
  //   let playlistId = req.params.id;
  //   let userId = req.user.id;
  //   try {
  //     const {
  //       name,
  //       artist,
  //       title,
  //       year,
  //       length,
  //       bpm,
  //       video
  //     } = req.body;
  //     const toUpdate = await Playlist.findOne({
  //       where: {
  //         id: playlistId,
  //         owner_id: userId
  //       },
  //     });
  //     if (toUpdate && name && servings && calories && date_eaten && meal) {
  //       toUpdate.name = name;
  //       toUpdate.servings = servings;
  //       toUpdate.calories = calories;
  //       toUpdate.date_eaten = date_eaten;
  //       toUpdate.meal = meal;
  //       toUpdate.carbs_in_grams = carbs_in_grams;
  //       toUpdate.fat_in_grams = fat_in_grams;
  //       toUpdate.protein_in_grams = protein_in_grams;
  //       await toUpdate.save();
  //       res.status(200).json({
  //         message: "Successfully updated food entry",
  //       });
  //     } else {
  //       res.status(404).json({
  //         message: "Entry information missing, entry not found, or user unauthorized to edit"
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     response.status(500).send( { message: "failed to update entry" } )
  //   }
  // })


module.exports = PlaylistItemController;
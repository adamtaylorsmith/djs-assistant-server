//const {Router, response} = require('express');
//const {PlaylistItem} = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const {User} = require('../models');
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
  .post(function(req, res) {
    let artist = req.body.playlistItem.artist;
    let title = req.body.playlistItem.title;
    let year = req.body.playlistItem.year;
    let length = req.body.playlistItem.length;
    let playlistId = req.params.id;
    let owner = req.user.id;
    PlaylistItem.create({
      artist: artist,
      title: title,
      year: year,
      length: length,
      playlist_id: playlistId,
      owner_id: owner
    });
    res.json({
      message: "Playlist entry created son!!!",
      //entry: newItem
    });
    function createError(err) {
      res.send(500, err.message);
    }
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     message: "Failed to create entry"
    //   });
    
  })
  .delete(async (req, res) => {
    const owner = req.user.id;
    const playlist = req.params.id;
    const data = req.body.playlistItem.id;
    try {
      const toRemove = await PlaylistItem.findOne({
        where: {
          playlist_id: playlist,
          owner_id: owner,
          id: data
        },
      });
      toRemove
        ? toRemove.destroy()
        : res.status(404).json({
          message: "Entry not found or entry does not belong to user",
        });
      res.status(200).json({
        message: "Successfully removed entry",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete entry",
      });
    }
  });

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
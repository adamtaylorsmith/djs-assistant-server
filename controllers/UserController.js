const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const {User} = require('../models');

const UserController = Router();

UserController.post('/register', async (req, res) => {
  console.log('YOURE IN');
  let email = req.body.email;
  let username = req.body.username;
  let pass = req.body.password;
  //let admin = req.body.user.isAdmin;

  try {
    await User.create({
      email: email,
      username: username,
      password: bcrypt.hashSync(pass, 10),
      //isAdmin: admin
    });
    res.status(201).json({
      message: 'User registered!'
    });
  } catch (error) {
    // STRETCH: Add in specific error when username is already registered
      res.status(500).json({
        message: 'Failed to register user'
      });
  }
});

UserController.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    let loginUser = await User.findOne( { where: { username } } );
    if ( loginUser && await bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: loginUser.id,
        token,
      });
    } else {
      res.status(401).json({
        message: 'Login failed cannot find user'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in'
    });
  }
});

module.exports = UserController;
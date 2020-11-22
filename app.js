require('dotenv').config();

const Express = require('express');
const db = require('./db');
const app = Express();

// // // ***** Controllers
const controllers = require('./controllers');

// const sequelize = require('./db');
// sequelize.sync()
app.use(Express.json());

// // // ***** CORS Middleware
app.use(require('./middleware/corsMiddleware'));

// // // ***** Open Routes
app.use('/user', controllers.User);

// // // ***** Authenticated Routes
app.use(require('./middleware/validate-session'));
app.use('/playlists', controllers.Playlist);  
app.use('/playlist', controllers.PlaylistItem);
// // //app.use('/admin', controllers.Admin);

db.authenticate()
.then(() => db.sync())
.then(() => {
  app.listen(process.env.PORT, () => console.log(`[server]: Listening on http://localhost:${process.env.PORT}`));
})

// https://djs-assistant-server.herokuapp.com/ | 
// https://git.heroku.com/djs-assistant-server.git
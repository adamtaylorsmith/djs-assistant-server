require('dotenv').config();

const Express = require('express');
const PlaylistController = require('./controllers/PlaylistController');
const PlaylistItemController = require('./controllers/PlaylistItemController');
const db = require('./db');
const app = Express();

// // // // ***** Controllers
const controllers = require('./controllers');
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
 });
// const sequelize = require('./db');
// sequelize.sync()
app.use(Express.json());

// // // // ***** CORS Middleware
app.use(require('./middleware/corsMiddleware'));

// // // // ***** Open Routes
app.use('/user', controllers.User);

// // // // ***** Authenticated Routes
app.use(require('./middleware/validate-session'));
app.use('/playlists', PlaylistController);  
app.use('/playlist', PlaylistItemController);

// // // //app.use('/admin', controllers.Admin);


db.authenticate()
.then(() => db.sync())
.then(() => {
  app.listen(process.env.PORT, () => console.log(`[server]: Listening on http://localhost:${process.env.PORT}`));
})

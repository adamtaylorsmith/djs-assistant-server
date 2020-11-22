const Sequelize = require('sequelize');
// const sequelize = new Sequelize('redbadgeapp', 'postgres', 'letmeinat1', {
//     host: 'localhost',
//     dialect: 'postgres'
// });
const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize.authenticate().then(
    function() {
        console.log('redbadgeapp postgres DB');
    },
    function(err) {
        console.log(err);
    }
);

// User.hasMany(Playlist);
// Playlist.hasMany(PlaylistItem);
// Playlist.belongsTo(User);
// PlaylistItem.belongsTo(Playlist);

module.exports = sequelize;

// const { Sequelize } = require('sequelize');

// const db = new Sequelize(process.env.DATABASE_URL);

// module.exports = db; DATABASE_URL,
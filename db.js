const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres'
// });
const sequelize = new Sequelize('xtranewredbadgeapp', 'postgres', 'letmeinat1', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('xtranewredbadgeapp postgres DB');
    },
    function(err) {
        console.log(err);
    }
);

//             // User.hasMany(Playlist);
//             // Playlist.hasMany(PlaylistItem);
//             // Playlist.belongsTo(User);
//             // PlaylistItem.belongsTo(Playlist);

 module.exports = sequelize;

// const { Sequelize } = require('sequelize');

// const db = new Sequelize(process.env.DATABASE_URL);

// module.exports = db; 
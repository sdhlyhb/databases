var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".





var db = new Sequelize('chat', 'root');
db.connect();
module.exports = db;

/************************************************/
// var connection = mysql.createConnection({
//   user: 'root',
//   // password: '',
//   database: 'chat',
// });

// connection.connect();

// module.exports = connection;

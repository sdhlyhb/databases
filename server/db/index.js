var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".





var db = new Sequelize('chat', 'root', '', {
  define: {
    timestamps: false
  }
});

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch ((error) => console.error('Unable to connect to the database:', error));



var User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING
});

var Message = db.define('messages', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  // eslint-disable-next-line camelcase
  msg_text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  // eslint-disable-next-line camelcase
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

// User.hasMany(Message);
// Message.belongsTo(User); //will added extra key to the table.

User.sync();
Message.sync();





module.exports.db = db;
module.exports.User = User;
module.exports.Message = Message;






var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM messages', function (err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      var queryString = `INSERT INTO messages VALUES (null, ${message.text}, ${message.username}, ${message.roomname})`;
      db.dbConnection.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }

      });
    } // a function which can be used to insert a message into the database

  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM users', function (err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }
      });
    },
    post: function (message, callback) { //?????may need another look
      var queryString = `INSERT INTO users VALUES (null,${message.username}`;
      db.dbConnection.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }

      });
    }
  }
};


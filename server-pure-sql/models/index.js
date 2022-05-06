var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function (err, results) {
        if (err) {
          console.log('GET MSG ERROR!!!', err);
        } else {
          console.log('the result we get is:', results);
          callback(null, results);
        }
      });
    }, // a function which produces all the messages
    post: function (body, callback) {
      console.log('this is body:', body);
      var queryString = `INSERT INTO messages (msg_text,roomname, user_id ) VALUES ("${body.text}", "${body.roomname}", (SELECT id FROM users WHERE username = "${body.username}"))`;
      db.query(queryString, function(err, results) {
        if (err) {
          console.log('POST MSG ERROR!!!', err);
        } else {
          console.log('the result we posted is:', results);
          callback(null, results);
        }

      });
    } // a function which can be used to insert a message into the database

  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * FROM users', function (err, results) {
        if (err) {
          console.log('GET USER ERROR!!!', err);
        } else {
          console.log('the users result we get is:', results);
          callback(null, results);
        }
      });

    },
    post: function (body, callback) {
      var queryString = `INSERT INTO users (username) SELECT ("${body.username}") WHERE NOT EXISTS (SELECT id FROM users WHERE username = "${body.username}" )`;
      db.query(queryString, function(err, results) {
        if (err) {
          console.log('POST USER ERROR!!!', err);
        } else {
          console.log('this is username:', body.username);
          console.log('the users result we posted is:', results);
          callback(null, results);
        }

      });
    }
  }
};


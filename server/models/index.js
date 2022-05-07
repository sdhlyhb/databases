var db = require('../db');
var Sequelize = require('sequelize');



module.exports = {
  messages: {
    get: function (callback) {
      db.Message.findAll()
        .then ((results) => callback(results) )
        .catch (err => console.log('Error getting messages!'));

    },

    post: function (body, callback) {
      console.log('this is body:', body);


      return db.User.findOne({where: {username: body.username}})
        .then((user) => {
          var params = {
            // eslint-disable-next-line camelcase
            msg_text: body.text,
            roomname: body.roomname,
            // eslint-disable-next-line camelcase
            user_id: user.id
          };
          return db.Message.create(params);
        })
        .then ((results) => callback(results) )
        .catch (err => console.log('Error posting msgs!'));


      // const user = db.User.findOne({where: {username: body.username}});
      // console.log('this is the user obj???', user);
      // return db.Message.create({
      //   // eslint-disable-next-line camelcase
      //   msg_text: body.text,
      //   roomname: body.roomname,
      //   // eslint-disable-next-line camelcase
      //   user_id: user.id


      // })

      //   .then ((results) => callback(results) )
      //   .catch (err => console.log('Error posting msgs!'));

    } // a function which can be used to insert a message into the database
  },



  users: {
    // Ditto as above.
    get: function (callback) {
      db.User.sync()
        .then(() => { return db.User.findAll(); })
        .then ((results) => callback(results) )
        .catch (err => console.log('Error getting users!'));


    },
    post: function (body, callback) {
      db.User.sync()
        .then(() => {

          return db.User.findOrCreate({where: {username: body.username}});
        })
        .then ((results) => callback(results) )
        .catch (err => console.log('Error posting users!'));

    }
  }
};





/*****************************/
// module.exports = {
//   messages: {
//     get: function (callback) {
//       db.query('SELECT * FROM messages', function (err, results) {
//         if (err) {
//           console.log('GET MSG ERROR!!!', err);
//         } else {
//           console.log('the result we get is:', results);
//           callback(null, results);
//         }
//       });
//     }, // a function which produces all the messages
//     post: function (body, callback) {
//       console.log('this is body:', body);
//       var queryString = `INSERT INTO messages (msg_text,roomname, user_id ) VALUES ("${body.text}", "${body.roomname}", (SELECT id FROM users WHERE username = "${body.username}"))`;
//       db.query(queryString, function(err, results) {
//         if (err) {
//           console.log('POST MSG ERROR!!!', err);
//         } else {
//           console.log('the result we posted is:', results);
//           callback(null, results);
//         }

//       });
//     } // a function which can be used to insert a message into the database

//   },

//   users: {
//     // Ditto as above.
//     get: function (callback) {
//       db.query('SELECT * FROM users', function (err, results) {
//         if (err) {
//           console.log('GET USER ERROR!!!', err);
//         } else {
//           console.log('the users result we get is:', results);
//           callback(null, results);
//         }
//       });

//     },
//     post: function (body, callback) {
//       var queryString = `INSERT INTO users (username) SELECT ("${body.username}") WHERE NOT EXISTS (SELECT id FROM users WHERE username = "${body.username}" )`;
//       db.query(queryString, function(err, results) {
//         if (err) {
//           console.log('POST USER ERROR!!!', err);
//         } else {
//           console.log('this is username:', body.username);
//           console.log('the users result we posted is:', results);
//           callback(null, results);
//         }

//       });
//     }
//   }
// };


var db = require('../db');
var Sequelize = require('sequelize');



module.exports = {
  messages: {
    get: function (callback) {
      return db.Message.findAll()
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
      // console.log('this is the user obj???', user); //the user here is a promise project, unsolved.
      // return db.Message.create({
      //   // eslint-disable-next-line camelcase
      //   msg_text: body.text,
      //   roomname: body.roomname,
      //   // eslint-disable-next-line camelcase
      //   user_id: user.id


      // })

      //   .then ((results) => callback(results) )
      //   .catch (err => console.log('Error posting msgs!'));


  },



  users: {
    // Ditto as above.
    get: function (callback) {
      return db.User.findAll()
        .then ((results) => callback(results) )
        .catch (err => console.log('Error getting users!'));


    },
    post: function (body, callback) {


      return db.User.findOrCreate({where: {username: body.username}})

        .then ((results) => callback(results) )
        .catch (err => console.log('Error posting users!'));

    }
  }
};






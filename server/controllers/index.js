var models = require('../models');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, results) => {
        if (err) {
          console.error('ERROR GETTING MSGS!');
          res.send(err);
        } else {
          console.log('Success GETTING MSGS!');

          res.status(200).send(results);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('this is the request body:', req.body);
      models.messages.post(req.body, (err) => {
        if (err) {
          console.error('ERROR POSTING MSGS!');
          res.send(err);
        } else {

          console.log('Success POSTING MSGS!');
          res.status(201).send(req.body);
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, results) => {
        if (err) {
          res.send(err);
        } else {

          res.status(200).send(results);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body, (err) => {
        if (err) {
          console.error('ERROR POSTING USERS!');
          res.send(err);
        } else {
          console.log('Success POSTING USERS!');

          res.status(201).send(req.body);
        }
      });
    }
  }
};


/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      // password: 'password',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.', //message changed to text to match client setting;
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        console.log(queryString);
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
        // Should have one result:

          console.log('this is the results:', results);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].msg_text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });


  it('Should give different users different ids when a message is posted', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: {
        username: 'Jeff'}
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Jeff',
          text: 'Hello world!',
          roomname: 'Hello'}
      }, function () {

        var queryString = 'SELECT * FROM messages';
        console.log(queryString);
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {


          console.log('this is the results:', results);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].user_id).to.equal(2);

          done();
        });
      });
    });
  });



  it('Should not store duplicated usernames', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Someone' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: {
          username: 'Someone',
        }
      }, function () {

        var queryString = 'SELECT * FROM users';
        console.log(queryString);
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {


          console.log('this is the results:', results);
          expect(results.length).to.equal(3);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].username).to.equal('Valjean');
          expect(results[1].username).to.equal('Jeff');
          expect(results[2].username).to.equal('Someone');
          done();
        });
      });
    });
  });




  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages (msg_text, roomname) VALUES ("Men like you can never change!", "main")';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('this is the msgLog:', messageLog);
        expect(messageLog[0].msg_text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });


  it('Should be able to post messages of same content at different rooms', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jeff',
        text: 'Hello world!',
        roomname: 'room1'}
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'jeff',
          text: 'Hello world!',
          roomname: 'room2'}
      }, function () {

        var queryString = 'SELECT * FROM messages';
        console.log(queryString);
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {


          console.log('this is the results:', results);
          expect(results.length).to.equal(2);

          expect(results[0].roomname).to.equal('room1');
          expect(results[1].roomname).to.equal('room2');

          done();
        });
      });
    });
  });


});

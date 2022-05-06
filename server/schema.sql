DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (

  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (id)

);

-- CREATE TABLE rooms (

--   id int(11) NOT NULL AUTO_INCREMENT,
--   roomname varchar(255),
--   PRIMARY KEY (id)

-- );

CREATE TABLE messages (
  /* Describe your table here. */
  /*id (Primary Key) int NOT NULL,
  content varchar(255),
  Foreign Key: users_id and rooms_id*/
  -- username and roomname info repeated?????
  id int(11) NOT NULL AUTO_INCREMENT,
  msg_text varchar(255),
  -- username varchar(255),
  roomname varchar(255),
   user_id int,
  --  room_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)




);

/* Create other tables and define schemas for them here! */
/*Table: users (id, username),


Table: rooms (id, roomname)*/





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


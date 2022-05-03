CREATE DATABASE chat;

USE chat;

CREATE TABLE users (

  id int NOT NULL,
  username varchar(255),
  PRIMARY KEY (id)

);

CREATE TABLE rooms (

  id int NOT NULL,
  roomname varchar(255),
  PRIMARY KEY (id)

);

CREATE TABLE messages (
  /* Describe your table here. */
  /*id (Primary Key) int NOT NULL,
  content varchar(255),
  Foreign Key: users_id and rooms_id*/
  id int NOT NULL,
  content varchar(255),
  username varchar(255),
  roomname varchar(255),
   user_id int,
   room_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)



);

/* Create other tables and define schemas for them here! */
/*Table: users (id, username),


Table: rooms (id, roomname)*/





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


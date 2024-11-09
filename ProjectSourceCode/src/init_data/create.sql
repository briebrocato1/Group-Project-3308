DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  email VARCHAR(60) NOT NULL,
  password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS routes;
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    routeName VARCHAR(255) NOT NULL,
    grade VARCHAR(10),
    safety VARCHAR(10),
    sport BOOLEAN NOT NULL,
    trad BOOLEAN NOT NULL,
    toprope BOOLEAN NOT NULL,
    boulder BOOLEAN NOT NULL,
    snow BOOLEAN NOT NULL,
    alpine BOOLEAN NOT NULL,
    firstAscent VARCHAR(255),
    description VARCHAR(3000),
    location VARCHAR(500),
    protection VARCHAR(500),
    areaLongitude DECIMAL(9,6),
    areaLatitude DECIMAL(9,6), 
    areaName VARCHAR(255)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    text VARCHAR(2500) NOT NULL,
    parentID INT,
    FOREIGN KEY (parentID) REFERENCES messages(id)
);

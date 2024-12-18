DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  email VARCHAR(60) NOT NULL,
  password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS routes CASCADE;
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
    alpine BOOLEAN,
    description VARCHAR(3000),
    location VARCHAR(3000),
    areaLongitude DECIMAL(9,6),
    areaLatitude DECIMAL(9,6), 
    areaName VARCHAR(255),
    firstAscent VARCHAR(255),
    rating DECIMAL(2,1),
    rating_count INTEGER DEFAULT 0,
    deleted BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES routes(id),
    author VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    body TEXT NOT NULL
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    text VARCHAR(2500) NOT NULL,
    parentID INT,
    FOREIGN KEY (parentID) REFERENCES messages(id)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    body VARCHAR(2500) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    route_id INT NOT NULL,
    CONSTRAINT fk_route FOREIGN KEY (route_id) REFERENCES routes(id)
);
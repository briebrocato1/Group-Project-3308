
const express = require('express'); 
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); 
const bodyParser = require('body-parser');
const session = require('express-session'); 
const bcrypt = require('bcryptjs'); //hash passwords
const axios = require('axios'); 


const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  });
  
  const dbConfig = {
    host: 'db', 
    port: 5432, 
    database: process.env.POSTGRES_DB, 
    user: process.env.POSTGRES_USER, 
    password: process.env.POSTGRES_PASSWORD, 
  };
  
  const db = pgp(dbConfig);
  
  db.connect()
    .then(obj => {
      console.log('Database connection successful'); 
      obj.done(); 
    })
    .catch(error => {
      console.log('ERROR:', error.message || error);
    });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(bodyParser.json()); 
    
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
      })
    );
    
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );



    //Routes

    app.get('/', (req, res) => {
        res.redirect('/home');
      });

      app.get('/login', (req, res) => {
        res.render('pages/login');
    });

    app.get('/register', (req, res) => {
        res.render('pages/register');
      });
    
      app.get('/home', (req, res) => {
        res.render('pages/home');
      });

      app.get('/messages', (req, res) => {
        res.render('pages/messages');
      });

      app.get('/routes', (req, res) => {
        res.render('pages/routes');
      });

app.listen(3000);
console.log('Server is listening on port 3000');

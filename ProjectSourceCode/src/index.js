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

    
      app.get('/register', (req, res) => {
        res.render('pages/register');
      });

      app.post('/register', async (req, res) => {
        try{
        //hash the password using bcrypt library
        const hash = await bcrypt.hash(req.body.password, 10);
      
        // To-DO: Insert username and hashed password into the 'users' table
        await db.none(
            `INSERT INTO users(username, password) VALUES ($1, $2);`,
            [req.body.username, hash]
        );
        res.redirect('/login?message=Successfully Registered')
    }
        catch(err) {
            res.redirect('/register?message=Unable to Register')
        }
      });

      app.get('/login', (req, res) => {
        res.render('pages/login');
    });

    app.post('/login', async (req, res) => {
        try {
                const user = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1;`,
                [req.body.username]
            );
            if (!user) {
                return res.redirect('/register?message=User not found. Please register.');
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.render('login', { message: 'Incorrect username or password.' });
            }
            req.session.user = user;
            req.session.save();
            res.redirect('/discover');
        } catch (err) {
            console.error(err);
            res.render('login', { message: 'An error occurred. Please try again.' });
        }
    });
    
    // Authentication Middleware.
    const auth = (req, res, next) => {
        if (!req.session.user) {
          // Default to login page.
          return res.redirect('/login');
        }
        next();
      };
      
      // Authentication Required
    app.use(auth);

    
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
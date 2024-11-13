
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

Handlebars.registerHelper('ifeq', function (v1, v2, options) { return (v1 == v2) ? options.fn(this) : options.inverse(this); });

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
app.use(express.static(path.join(__dirname, 'resources')));
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

app.get('/welcome', (req, res) => {
  res.json({ status: 'success', message: 'Welcome!' });
});

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/register', (req, res) => {
  res.render('pages/register', { message: req.query.message });
});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid input: Email format is incorrect' });
    }

    // Hash the password using bcrypt
    const hash = await bcrypt.hash(password, 10);

    // Insert username and hashed password into the 'users' table
    await db.none(
      `INSERT INTO users(username, email, password) VALUES ($1, $2, $3);`,
      [username, email, hash]
    );

    res.redirect('/login');
  } catch (err) {
    res.redirect('/register?message=Unable to Register');
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
      return res.redirect(`/register?message=User not found. Please register.`);
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.render('pages/login', { message: `Incorrect username or password.` });
    }
    req.session.user = user;
    req.session.save();

    res.redirect('/home');

  } catch (err) {
    console.error(err);
    res.render('pages/login', { message: `An error occurred. Please try again.` });
  }
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    // Set undefined values so that pages can be rendered without logging in.
    req.session.user = { username: undefined, email: undefined };
  }
  next();
};

// Authentication Required
app.use(auth);

app.get('/home', (req, res) => {
  res.render('pages/home', { username: req.session.user.username, email: req.session.user.email });
});


app.get('/routes', (req, res) => {
  res.render('pages/routes', { username: req.session.user.username, email: req.session.user.email });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('pages/logout', { message: `Logged out successfully!` });
});


async function getMessages(user) {
  try {
    const messages = await db.any(`
      SELECT id, author, text, parentid
      FROM messages
      ORDER BY parentid, id;
    `);
    let messageMap = {};
    let topLevelMessages = [];

    messages.forEach(msg => {
        messageMap[msg.id] = { ...msg, replies: [], username: user };
    });
    
    messages.forEach(msg => {
      if (msg.parentid) {

        messageMap[msg.parentid].replies.push(messageMap[msg.id]);
      } else {
        topLevelMessages.push(messageMap[msg.id]);
      }
    });

    const messagesWithIndentLevels = setIndentLevels(topLevelMessages);

    return messagesWithIndentLevels;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Error retrieving messages');
  }
}

function setIndentLevels(messages, parentLevel = 0) {
  return messages.map(msg => {

    msg.indentLevel = parentLevel;

    if (msg.replies && msg.replies.length > 0) {
      msg.replies = setIndentLevels(msg.replies, parentLevel + 2);
    }

    return msg;
  });
}

app.post('/messageboard', async (req, res) => {
  const { author, text } = req.body;
  try {
    res.render('pages/messageboard', {
      isMessageBoard: true 
    });
    const newMessage = await db.one(
      `INSERT INTO messages (author, text, parentid)
      VALUES ($1, $2, NULL) 
      RETURNING id, author, text, parentid;`,
      [author, text]);

    console.log('New message added:', newMessage);

    res.status(200).json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/add-reply', async (req, res) => {
  const { parentId, text, author } = req.body;

  try {

    const newReply = await db.one(
      `INSERT INTO messages (author, text, parentid)
      VALUES ($1, $2, $3) 
      RETURNING id, author, text, parentid;`,
      [author, text, parentId]
    );

    console.log('New reply added:', newReply);

    res.status(200).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/delete-message/:id', async (req, res) => {
  const { id } = req.params;
  const { hasReplies } = req.body; 

  try {
    if (hasReplies) {

      await db.none(`
        UPDATE messages
        SET author = 'Deleted', text = 'This message has been deleted.'
        WHERE id = $1;
      `, [id]);

      console.log('Message marked as deleted:', id);
      res.status(200).json({ success: true, message: 'Message marked as deleted' });
    } else {

      await db.none(`
        DELETE FROM messages WHERE id = $1;
      `, [id]);

      console.log('Message deleted:', id);
      res.status(200).json({ success: true, message: 'Message deleted successfully' });
    }
  } catch (error) {
    console.error('Error handling delete:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Define route for displaying messages
app.get('/messageboard', async (req, res) => {
  try {
    const messages = await getMessages(req.session.user.username);
    res.render('pages/messageboard', { username: req.session.user.username, email: req.session.user.email, boardmessages: messages }); // Render messages with Handlebars
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


module.exports = app.listen(3000);
console.log('Server is listening on port 3000');

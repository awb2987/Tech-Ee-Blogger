// Import necessary packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { sequelize } = require('./config/connection');
const routes = require('./controllers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Initialize the session middleware
app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({
  helpers: {
    currentYear: () => new Date().getFullYear(), // Helper for the current year
  },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes setup
app.use(routes);

// Catch-all for 404
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Database synchronization and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

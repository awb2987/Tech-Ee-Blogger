// Import Sequelize and dotenv
const Sequelize = require('sequelize');
require('dotenv').config();

// Create a connection to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize connection
module.exports = { sequelize };

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

// Use the routes
router.use('/users', userRoutes);
router.use('/api', apiRoutes);

// Default route for testing
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;

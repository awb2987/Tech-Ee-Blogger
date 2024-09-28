const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../config/middleware').withAuth;

// User registration
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user_id = newUser.id; // Store user ID in the session
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    req.session.user_id = user.id; // Store user ID in the session
    res.json({ message: 'Login successful!', user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User logout
router.post('/logout', withAuth, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(204).end(); // No content response
  });
});

module.exports = router;

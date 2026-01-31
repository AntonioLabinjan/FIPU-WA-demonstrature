const express = require('express');
const router = express.Router();
const { getCollection } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// --- HELPERS ---
function validateUserData({ username, password, email }) {
  const errors = [];

  if (!username || typeof username !== 'string' || username.length < 3 || username.length > 20) {
    errors.push('Username must be a string between 3 and 20 characters.');
  }

  if (
    !password ||
    typeof password !== 'string' ||
    password.length < 8 ||
    !/^[a-zA-Z0-9]+$/.test(password)
  ) {
    errors.push('Password must be alphanumeric and at least 8 characters.');
  }

  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    errors.push('Email must be valid and contain "@" and ".".');
  }

  return errors;
}

// --- UTILITY ---
async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// --- ROUTES ---

// POST /signup - dodaj korisnika
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const errors = validateUserData({ username, password, email });

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid user data.', errors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = { username, password: hashedPassword, email };
    const result = await getCollection('users').insertOne(user);

    res.status(201).json({ _id: result.insertedId, username, email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /login - autentikacija
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await getCollection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = {
  router,           // ovo je Express router
  comparePassword   // ovo možeš importati negdje drugo
};

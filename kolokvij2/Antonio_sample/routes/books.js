// routes/books.js
const express = require('express');
const router = express.Router();



const { getCollection } = require('../db');
const { ObjectId } = require('mongodb');

// --- HELPERS ---
function validateBookData({ title, author, year, copies }) {
  const errors = [];

  if (!title || typeof title !== 'string' || title.length < 3 || title.length > 100) {
    errors.push('Title must be a string between 3 and 100 characters.');
  }

  if (!author || typeof author !== 'string' || author.length < 3 || author.length > 50) {
    errors.push('Author must be a string between 3 and 50 characters.');
  }

  const currentYear = new Date().getFullYear();
  if (year === undefined || typeof year !== 'number' || year < 1500 || year > currentYear) {
    errors.push(`Year must be a number between 1500 and ${currentYear}.`);
  }

  if (copies === undefined || typeof copies !== 'number' || copies < 1) {
    errors.push('Copies must be a number greater than 0.');
  }

  return errors;
}

// --- MIDDLEWARE ---
async function validateBook(req, res, next) {
  const body = req.body;

  if (Array.isArray(body)) {
    // multiple books
    req.type = 'multiple';
    if (body.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of books.' });
    }

    const errors = [];
    const validBooks = [];

    body.forEach((book, index) => {
      const bookErrors = validateBookData(book);
      if (bookErrors.length > 0) {
        errors.push({ index, errors: bookErrors });
      } else {
        validBooks.push(book);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Some books are invalid.', errors });
    }

    req.validBooks = validBooks; // proslijedimo dalje
  } else if (typeof body === 'object' && body !== null) {
    // single book
    req.type = 'single';
    const errors = validateBookData(body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Invalid book data.', errors });
    }
    req.validBook = body; // proslijedimo dalje
  } else {
    return res.status(400).json({ message: 'Invalid request body.' });
  }

  next();
}

// --- ROUTES ---

// GET / - sve knjige
router.get('/', async (req, res) => {
  try {
    const books = await getCollection('books').find().toArray();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /:id - jedna knjiga
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID.' });
  }

  try {
    const book = await getCollection('books').findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ---------------------------------------------
   STARI POST / - dodavanje jedne knjige
-----------------------------------------------
router.post('/', async (req, res) => {
  const { title, author, year, copies } = req.body;
  const errors = validateBookData({ title, author, year, copies });

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid book data.', errors });
  }

  try {
    const result = await getCollection('books').insertOne({ title, author, year, copies });
    res.status(201).json({ _id: result.insertedId, title, author, year, copies });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
*/

/* ---------------------------------------------
   STARI POST /add_many - dodavanje više knjiga
-----------------------------------------------
router.post('/add_many', async (req, res) => {
  const booksArray = req.body;

  if (!Array.isArray(booksArray) || booksArray.length === 0) {
    return res.status(400).json({ message: 'Request body must be a non-empty array of books.' });
  }

  const errors = [];
  const validBooks = [];

  booksArray.forEach((book, index) => {
    const bookErrors = validateBookData(book);
    if (bookErrors.length > 0) {
      errors.push({ index, errors: bookErrors });
    } else {
      validBooks.push(book);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Some books are invalid.', errors });
  }

  try {
    const result = await getCollection('books').insertMany(validBooks);
    // Dodamo _id polja iz insertMany rezultata
    const insertedBooks = validBooks.map((book, idx) => ({
      _id: result.insertedIds[idx],
      ...book
    }));
    res.status(201).json({ message: `${result.insertedCount} books added.`, books: insertedBooks });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
*/

// --- NOVI POST / - koristi middleware validateBook ---
router.post('/', validateBook, async (req, res) => {
  try {
    const collection = getCollection('books');

    if (req.type === 'single') {
      const result = await collection.insertOne(req.validBook);
      res.status(201).json({ _id: result.insertedId, ...req.validBook });
    } else if (req.type === 'multiple') {
      const result = await collection.insertMany(req.validBooks);
      const insertedBooks = req.validBooks.map((book, idx) => ({
        _id: result.insertedIds[idx],
        ...book
      }));
      res.status(201).json({ message: `${result.insertedCount} books added.`, books: insertedBooks });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

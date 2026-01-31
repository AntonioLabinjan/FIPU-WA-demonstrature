// index.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersModule = require('./routes/users');
const usersRouter = usersModule.router;
app.use('/users', usersRouter)

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);








app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

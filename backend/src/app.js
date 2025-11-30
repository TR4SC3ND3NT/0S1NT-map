const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to OSINT MAP API' });
});

module.exports = app;

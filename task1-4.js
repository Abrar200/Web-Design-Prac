const express = require('express');
const app = express();
const usersRouter = require('./users');

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Use the users router
app.use('/users', usersRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
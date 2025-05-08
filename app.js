const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Create Express application
const app = express();

// Middleware for counting requests
let requestCount = 0;
app.use((req, res, next) => {
    requestCount++;
    console.log(`Received ${requestCount} requests`);
    next();
});

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import route handlers
const brewRouter = require('./routes/brew');
const passItOnRouter = require('./routes/pass-it-on');
const combineRouter = require('./routes/combine');
const usersRouter = require('./routes/users');
const cookieRouter = require('./routes/cookie');

// Use the routers
app.use('/', brewRouter);
app.use('/', passItOnRouter);
app.use('/', combineRouter);
app.use('/users', usersRouter);
app.use('/', cookieRouter);

// Simple test route for the root path
app.get('/', (req, res) => {
    res.send('Server is running. Access task1-4.html to test the blog functionality.');
});

module.exports = app;
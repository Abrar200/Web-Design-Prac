const express = require('express');
const path = require('path');

// Create Express application
const app = express();

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

// Use the routers
app.use('/', brewRouter);
app.use('/', passItOnRouter);
app.use('/', combineRouter);
app.use('/users', usersRouter);

module.exports = app;
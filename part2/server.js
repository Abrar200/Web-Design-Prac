const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Your MySQL username
    password: '',     // Your MySQL password
    database: 'sakila'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Redirect root to actors.html
app.get('/', (req, res) => {
    res.redirect('/actors.html');
});

// API endpoint to get all actors
app.get('/api/actors', (req, res) => {
    const query = 'SELECT first_name, last_name FROM actor ORDER BY last_name, first_name';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching actors:', err);
            return res.status(500).json({ error: 'Failed to fetch actors' });
        }
        res.json(results);
    });
});

// API endpoint to add a new actor
app.post('/api/actors', (req, res) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First name and last name are required' });
    }

    const query = 'INSERT INTO actor (first_name, last_name) VALUES (?, ?)';

    db.query(query, [firstName, lastName], (err, result) => {
        if (err) {
            console.error('Error adding actor:', err);
            return res.status(500).json({ error: 'Failed to add actor' });
        }

        res.status(201).json({
            id: result.insertId,
            first_name: firstName,
            last_name: lastName
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
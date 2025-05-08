const express = require('express');
const router = express.Router();

// Route to handle cookie incrementation
router.get('/cookie', (req, res) => {
    let cookieValue = 1;

    // Check if the cookie exists
    if (req.cookies && req.cookies.task3_1) {
        // Convert to number and increment
        cookieValue = parseInt(req.cookies.task3_1, 10) + 1;
    }

    // Set the cookie with the new value
    res.cookie('task3_1', cookieValue, {
        httpOnly: true, // This is optional but recommended for security
        // You can add more cookie options here like maxAge, secure, etc.
    });

    // Send a response
    res.send(`Cookie task3_1 set to ${cookieValue}`);
});

module.exports = router;
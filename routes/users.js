const express = require('express');
const router = express.Router();

// Middleware to log POST requests
router.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log('POST from a user');
    }
    next();
});

// Middleware to check Content-Type header for POST requests
router.use('*', (req, res, next) => {
    if (req.method === 'POST') {
        const contentType = req.headers['content-type'];

        if (!contentType || !contentType.includes('application/json')) {
            return res.status(412).send('Precondition Failed: Content-Type must be application/json');
        }
    }
    next();
});

// Data structure to store blog posts
const blogPosts = [];

// POST route to add a new blog post
router.post('/addpost', (req, res) => {
    const { title, content } = req.body;

    // Validate that both title and content exist
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create a new post object with timestamp for sorting
    const newPost = {
        title,
        content,
        timestamp: Date.now()
    };

    // Add the post to our data structure
    blogPosts.push(newPost);

    // Send success response
    res.status(201).json({ message: 'Post added successfully' });
});

// GET route to retrieve all blog posts
router.get('/getposts', (req, res) => {
    // Sort posts from newest to oldest based on timestamp
    const sortedPosts = [...blogPosts]
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(post => ({
            title: post.title,
            content: post.content
        }));

    // Send the sorted posts as JSON
    res.json(sortedPosts);
});

// GET route for the root path (for testing)
router.get('/', (req, res) => {
    res.send('Users API: Use /addpost (POST) to add posts and /getposts (GET) to retrieve posts');
});

module.exports = router;
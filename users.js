const express = require('express');
const router = express.Router();

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
    // Create a copy of the posts array to avoid modifying the original
    const posts = blogPosts.map(post => ({
        title: post.title,
        content: post.content
    }));

    // Sort posts from newest to oldest
    posts.sort((a, b) => b.timestamp - a.timestamp);

    // Send the sorted posts
    res.json(posts);
});

module.exports = router;
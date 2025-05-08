// Initialize a variable to store the previous message
let previousMessage = null;

// Set up middleware to parse form data (required for form-encoded data)
app.use(express.urlencoded({ extended: true }));

app.post('/pass-it-on', (req, res) => {
    // Check if message exists and is not empty
    if (!req.body.message || req.body.message.trim() === '') {
        return res.status(400).send('Bad request: message is required');
    }

    // Store the current message
    const currentMessage = req.body.message.trim();

    // Prepare response - either the previous message or 'first'
    const responseMessage = previousMessage || 'first';

    // Update the previous message for the next request
    previousMessage = currentMessage;

    // Send the response
    res.send(responseMessage);
});
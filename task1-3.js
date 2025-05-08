app.use(express.json());

app.post('/combine', (req, res) => {
    // Get the lines array and suffix from the request body
    const { lines, suffix } = req.body;

    // Validate that both lines and suffix exist
    if (!lines || !suffix) {
        return res.status(400).send('Bad request: Both lines and suffix are required');
    }

    // Combine each line with the suffix and join with newlines
    const result = lines
        .map(line => line + suffix)
        .join('\n');

    // Send the combined result as the response
    res.send(result);
});
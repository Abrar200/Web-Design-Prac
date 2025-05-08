app.get('/brew', (req, res) => {
    const drink = req.query.drink;

    if (!drink) {
        return res.status(400).send('Bad request: drink parameter is required');
    }

    switch (drink.toLowerCase()) {
        case 'tea':
            return res.status(200).send('A delicious cup of tea!');
        case 'coffee':
            return res.status(418).send("I'm a teapot");
        default:
            return res.status(400).send('Bad request: invalid drink parameter');
    }
});
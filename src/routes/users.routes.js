const { Router } = require('express');

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
    res.send("teste");
});

module.exports = userRoutes;
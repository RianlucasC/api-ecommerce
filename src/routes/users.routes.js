const { Router } = require('express');
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const usersController = new UserController();

userRoutes.get('/', (req, res) => {
    res.send("teste");
});

userRoutes.post('/', usersController.create);



module.exports = userRoutes;
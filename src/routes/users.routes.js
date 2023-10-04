const { Router } = require('express');
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const usersController = new UserController();

userRoutes.post('/register', usersController.create);
userRoutes.post('/login', usersController.login);

module.exports = userRoutes;
const { Router } = require('express');
const UserController = require("../controllers/UsersController");
const verifyToken = require("../middlewares/VerifyToken");

const userRoutes = Router();
const usersController = new UserController();

userRoutes.post('/register', usersController.create);
userRoutes.post('/login', usersController.login);
userRoutes.get('/', verifyToken, usersController.index);
userRoutes.delete('/', verifyToken, usersController.delete);

module.exports = userRoutes;
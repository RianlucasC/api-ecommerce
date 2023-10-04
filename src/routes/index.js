const { Router } = require("express");
const userRoutes = require("./users.routes");
const productRoutes = require("./products.routes");

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);

module.exports = routes;
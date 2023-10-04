const { Router } = require("express");
const ProductController = require("../controllers/ProductsController");
const verifyToken = require("../middlewares/VerifyToken");


const productRoutes = Router();
const productController = new ProductController();

productRoutes.post('/', verifyToken, productController.create)

module.exports = productRoutes;
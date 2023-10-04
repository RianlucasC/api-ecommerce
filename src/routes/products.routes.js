const { Router } = require("express");
const ProductController = require("../controllers/ProductsController");
const verifyToken = require("../middlewares/VerifyToken");


const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);
productRoutes.get('/:id', productController.show);
productRoutes.post('/', verifyToken, productController.create);
productRoutes.delete('/:id', verifyToken, productController.delete);

module.exports = productRoutes;
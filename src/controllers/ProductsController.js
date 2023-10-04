const AppError = require("../utils/AppError");
const Product = require("../database/models/Product");

class ProductController {
    async create(req, res) {
        const { isAdmin } = req.user;
        
        if (!isAdmin) {
            throw new AppError("you do not have permission to access this route", 403);
        };

        const {name, description, price, categories, images} = req.body;

        if (!name || !description || !price || !categories || !images) {
            throw new AppError("fill in all fields");
        }

        const product = await Product.create({
            name,
            description,
            price,
            images,
            categories
        });

        return res.status(201).json(product);
    }
};

module.exports = ProductController;
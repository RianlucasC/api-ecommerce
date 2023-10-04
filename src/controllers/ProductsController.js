const AppError = require("../utils/AppError");
const Product = require("../database/models/Product");
const mongoose = require("mongoose")

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
    };

    async index(req, res) {
        const products = await Product.find();
        return res.json(products);
    };

    async show(req, res) {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new AppError("invalid id");
        }

        const product = await Product.findById(id);

        if(!product) {
            throw new AppError("product not found", 404);
        };

        return res.json(product);
    };

    async delete(req, res) {
        const { id } = req.params;
        const { isAdmin } = req.user;
        
        if (!isAdmin) {
            throw new AppError("you do not have permission to access this route", 403);
        };

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new AppError("invalid id");
        }

        const product = await Product.findById(id);

        if(!product) {
            throw new AppError("product not found", 404);
        };

        await Product.findByIdAndDelete(id);
        res.json();
    }
};

module.exports = ProductController;
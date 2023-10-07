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
        const { ids } = req.body;
        const { category } = req.query;
        let products;

        if (ids) {
            products = await Product.find({ _id: { $in: ids } });
            return res.json(products);
        } else if (category) {
            products = await Product.find({ categories: category });
            return res.json(products);
        } else {
            products = await Product.find();
            return res.json(products);
        }
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
    };

    async update(req, res) {
        if(req.user.isAdmin === true) {
            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                throw new AppError("product not found");
            };

            const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
            return res.json();

        }else {
            throw new AppError("you do not have permission");
        }
    }
};

module.exports = ProductController;
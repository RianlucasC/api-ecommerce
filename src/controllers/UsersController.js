const AppError = require("../utils/AppError");
const User = require("../database/models/User");
const bcrypt = require("bcrypt");

class UserController {
    async create(req, res) {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email: email});

        if(userExists) {
            throw new AppError("There is already a user with this email");
         }
         
        if(!name, !email, !password) {
            throw new AppError("fill in all fields");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword
        });

        return res.status(201).json();
    };
};

module.exports = UserController;
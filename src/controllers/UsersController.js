const AppError = require("../utils/AppError");
const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    async login(req, res) {
        const {email, password} = req.body;

        if (!email, !password) {
            throw new AppError("fill in all fields");
        };

        const user = await User.findOne({email: email});

        if(!user) {
            throw new AppError("There is no user with that email", 404);
        };

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            throw new AppError("passwords don't match");
        };

        const secret = process.env.SECRET;
        const token = await jwt.sign({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },secret);

        return res.status(200).json({token: token});
    };


};

module.exports = UserController;
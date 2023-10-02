const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
    },
    email: {
        type: String,
        required: true,
        minLength: 11,
    },
    password_hash: {
        type: String,
        required: true,
        minLength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
require('dotenv').config();
const mongoose = require("mongoose");
const url = process.env.DB_URL;

async function connection() {
    try {
        await mongoose.connect(url);
        console.log("conectado");
    }catch (err) {
        console.log(err);
    }
}

module.exports = connection;
require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const connection = require("./database/connection");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 5000;


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

connection();

app.listen(port, () => {
    console.log('rodando');
});
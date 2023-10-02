const express = require("express");
const routes = require("./routes");
const connection = require("./database/connection");


const app = express();
app.use(express.json());
app.use(routes);

connection();

app.listen(5000, () => {
    console.log('rodando na porta 5000');
});
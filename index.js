const express = require("express");
const app = express();

app.get('/', (req, resp) => {
    resp.send("bem vindo ao blog em node");
});

app.listen(8080, () => {
    console.log("servidor rodando");
})
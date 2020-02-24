const express = require("express");
const app = express();
const bodyParset = require('body-parser');
const connection = require("./database/database");


//view engine
app.set('view engine', 'ejs');


//arquivo estratico
app.use(express.static('public'));

//tratar formularios bod-parser
app.use(bodyParset.urlencoded({extended: false}));
app.use(bodyParset.json());

//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexao com o banco estabelecida");
    })
    .catch((error)=> {
        console.log(error);
    })

app.get('/', (req, resp) => {
    resp.render("index");
});

app.listen(8080, () => {
    console.log("servidor rodando");
});
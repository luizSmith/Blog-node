const express = require("express");
const app = express();
const bodyParset = require('body-parser');


//view engine
app.set('view engine', 'ejs');


//arquivo estratico
app.use(express.static('public'));

//tratar formularios bod-parser
app.use(bodyParset.urlencoded({extended: false}));
app.use(bodyParset.json());

app.get('/', (req, resp) => {
    resp.render("index");
});

app.listen(8080, () => {
    console.log("servidor rodando");
});
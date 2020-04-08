const express = require("express");
const app = express();
const bodyParset = require('body-parser');
const connection = require("./database/database");

//importando controllers
const categoriesController = require('./categories/CategoriesContoller');
const articlesController = require('./articles/ArticlesContoller');


//view engine
app.set('view engine', 'ejs');


//arquivo estratico
app.use(express.static('public'));

//tratar formularios bod-parser
app.use(bodyParset.urlencoded({extended: false}));
app.use(bodyParset.json());

//Model
const Article = require('./articles/Article');
const Category = require('./categories/Category');

//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexao com o banco estabelecida");
    })
    .catch((error)=> {
        console.log(error);
    })

//chamando rotas da controller categorias
//a barra representa o prefixo para acessar a rota
app.use("/",categoriesController);

//chamando rota da controller articles
app.use('/',articlesController);

app.get('/', (req, resp) => {

    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            resp.render("index",{
                articles:articles,
                categories:categories
            });
        })        
    });
    
});

app.get('/:slug',(req, resp) => {
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                resp.render("article",{
                    article:article,
                    categories:categories
                });
            });  
        } else {
            resp.redirect('/')
        }
    }).catch(erro => {
        resp.redirect("/");
    })
});

app.get('/category/:slug',(req, resp) => {
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include: [{
            model: Article
        }]
    }).then(category => {
        if (category != undefined) {

            Category.findAll().then(categories => {
                resp.render("index",{
                    
                    articles:category.tb_articles,
                    categories:categories //nav bar
                })
            })
            
        } else {
            resp.redirect('/')
        }
    }).catch(erro => {
        resp.redirect("/");
    })
});

app.listen(8080, () => {
    console.log("servidor rodando");
});
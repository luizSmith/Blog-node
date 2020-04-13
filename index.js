const express = require("express");
const app = express();
const bodyParset = require('body-parser');
const session = require("express-session");
const connection = require("./database/database");

//importando controllers
const categoriesController = require('./categories/CategoriesContoller');
const articlesController = require('./articles/ArticlesContoller');
const usersController = require('./users/UsersController');

//view engine
app.set('view engine', 'ejs');


//session
app.use(session({
    secret: "novaera", //hash se segurança
    cookie: {
        maxAge: 360000 //tempo do cookie de 30seg
    }
}))

//arquivo estratico
app.use(express.static('public'));

//tratar formularios bod-parser
app.use(bodyParset.urlencoded({extended: false}));
app.use(bodyParset.json());

//Model
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

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

app.use('/',usersController);

app.get('/', (req, resp) => {

    Article.findAndCountAll({
        limit: 4,
        offset: 0,
        order: [
            ['id','desc']
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

app.get('/category/:slug/:num?',(req, resp) => {
    var page = req.params.num;
    var offset = 0;
    var slug = req.params.slug;

    if (!isNaN(page) && page > 0) {
        offset = parseInt(page -1) * 4;
    } else {
        page = 1;
    }
    
    Article.findAndCountAll({
        include: [{
            model: Category,
            where:{
                slug:slug
            }
        }],
        limit: 4,
        offset: offset,
        order: [
            ['id','desc']
        ]    
    }).then(articles => {
        if (articles != undefined) {

            var result = {
                articles: articles,
                finalPage: Math.ceil(articles.count / 4) // arredonda para cima
            }

            Category.findAll().then(categories => {
                resp.render("admin/categories/articlePage",{
                    
                    categories:categories,
                    result:result,
                    page: parseInt(page),
                    slug:slug

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
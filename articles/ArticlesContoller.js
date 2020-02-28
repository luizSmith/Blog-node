const express = require("express");
const router = express.Router();

const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

//objeto utilizado para criar as rotas
router.get('/admin/articles', (req, resp) => {
    Article.findAll({
        include: [{model: Category}],
        raw:true,
        order: [
            ['id','desc']
        ]
    }).then(articles => {
        resp.render('admin/articles/index',{
            articles:articles
        });
    });
});

router.get('/admin/articles/new', (req,resp) => {
    Category.findAll({
        raw:true
    }).then(categories => {
        resp.render('admin/articles/new',{
            categories:categories
        });
    })
});


router.post('/articles/save',(req,resp) => {
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;

    if (title != undefined && isNaN(title)) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            tbCategoryId: category
        }).then(() => {
            resp.redirect('/admin/articles');
        })
    } else {
        resp.redirect('/admin/articles');
    }
});

module.exports = router;
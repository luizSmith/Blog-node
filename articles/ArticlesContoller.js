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

module.exports = router;
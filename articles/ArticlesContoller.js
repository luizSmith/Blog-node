const express = require("express");
const router = express.Router();

const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

const adminAuth = require("../middlewares/adminAuth");

//objeto utilizado para criar as rotas
router.get('/admin/articles', adminAuth ,(req, resp) => {
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

router.get('/admin/articles/new', adminAuth ,(req,resp) => {
    Category.findAll({
        raw:true
    }).then(categories => {
        resp.render('admin/articles/new',{
            categories:categories
        });
    })
});


router.post('/articles/save', adminAuth ,(req,resp) => {
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

router.post('/articles/delete', adminAuth ,(req,resp) => {
    var id = req.body.id;

    if (id != undefined && !isNaN(id)) {

        Article.destroy({
            where:{
                id: id
            }
        }).then(() => {
            resp.redirect("/admin/articles");
        });
    } else { 
        resp.redirect("/admin/articles");
    }
});

router.get('/admin/articles/edit/:id', adminAuth ,(req,resp) => {
    var id = req.params.id;

    if (id != undefined && !isNaN(id)) {

        Article.findByPk(id).then(article => {

            Category.findAll().then(categories => {

                resp.render('admin/articles/edit',{
                    article:article,
                    categories:categories
                });

            });
    
        }).catch(erro => {
            resp.redirect("/admin/categories");
        });

    } else {
        resp.redirect("/admin/articles");
    }

});

router.post("/articles/update", adminAuth ,(req, resp) => {
    var id = req.body.id;
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;

    if (id != undefined && !isNaN(id)) {
        Article.update({
            title:title,
            slug: slugify(title),
            tbCategoryId: category,
            body:body
        },{
            where: {
                id: id
            }
        }).then(() => {
            resp.redirect("/admin/articles");
        })
    } else {
        resp.redirect("/admin/articles");
    }
});

router.get("/articles/page/:num?", (req, resp) => {
    var page = req.params.num;
    var offset = 0;

    if (!isNaN(page) && page > 0) {
        offset = parseInt(page -1) * 4;
    } else {
        page = 1;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id','desc']
        ]        
    }).then(articles => {

        var result = {
            articles: articles,
            finalPage: Math.ceil(articles.count / 4) // arredonda para cima
        }

        Category.findAll().then(categories => {
            resp.render("admin/articles/page",{
                categories:categories,
                result:result,
                page: parseInt(page)
            });            
        })
    })

})

module.exports = router;
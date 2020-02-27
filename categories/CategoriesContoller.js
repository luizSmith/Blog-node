const express = require("express");
const router = express.Router();

const Category = require('./Category');
const slugify = require("slugify");

//objeto utilizado para criar as rotas
//rota formulario para criar categoria
router.get('/admin/categories/new', (req, resp) => {
    resp.render("admin/categories/new");
});

//salvar categoria
router.post("/categories/save", (req,resp) => {
    var title = req.body.title;
    if (title != undefined) {

        Category.create({
            title: title,
            // npm install --save slugify
            //"Desenvolvimento web" => "desenvolvimento-web"
            slug: slugify(title)
        }).then(() => {
            resp.redirect('/admin/categories');
        })

    } else {
        resp.redirect("/admin/categories/new");
    }
});

//lista categoria
router.get("/admin/categories", (req, resp) => {
    Category.findAll({
        raw: true,
        order: [
            ['id','desc']
        ]
    }).then(categorias => {
        resp.render('admin/categories/index',{
            categorias:categorias
        });
    })    
});

//deleta categoria
router.post('/categories/delete', (req,resp) => {
    var id = req.body.id;

    if (id != undefined && !isNaN(id)) { // se não for null && se não for um numero
            Category.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                resp.redirect("/admin/categories");
            });
    } else { 
        resp.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req,resp) => {
    var id = req.params.id;

    if (id != undefined && !isNaN(id)) {

        Category.findByPk(id).then(category => {
        
            resp.render('admin/categories/edit',{
                category:category
            });
    
        }).catch(erro => {
            resp.redirect("/admin/categories");
        });

    } else {
        resp.redirect("/admin/categories");
    }

});

router.post("/categories/update", (req, resp) => {
    var id = req.body.id;
    var title = req.body.title;

    if (id != undefined && !isNaN(id)) {
        Category.update({
            title: title,
            slug: slugify(title)
        },{
            where: {
                id: id
            }
        }).then(() => {
            resp.redirect("/admin/categories");
        })
    } else {
        resp.redirect("/admin/categories");
    }

})

module.exports = router;
const express = require("express");
const router = express.Router();

const Category = require('./Category');
const slugify = require("slugify");

//objeto utilizado para criar as rotas
router.get('/admin/categories/new', (req, resp) => {
    resp.render("admin/categories/new");
});

router.post("/categories/save", (req,resp) => {
    var title = req.body.title;
    if (title != undefined) {

        Category.create({
            title: title,
            // npm install --save slugify
            //"Desenvolvimento web" => "desenvolvimento-web"
            slug: slugify(title)
        }).then(() => {
            resp.redirect('/');
        })

    } else {
        resp.redirect("/admin/categories/new");
    }
});

module.exports = router;
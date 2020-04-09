const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, resp) => {
    User.findAll().then(users => {
        resp.render("admin/users/index",{
            users:users
        });
    }).catch(erro => {
        resp.redirect("/admin/users/create");
        console.log(erro)
    });
});

router.get('/admin/users/create', (req, resp) => {
    resp.render("admin/users/create");
});

router.post('/user/create',(req,resp) => {
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if (user == undefined) {
            User.create({
                email:email,
                password: hash
            }).then(() => {
                resp.redirect("/");
            }).catch(erro => {
                resp.redirect("/admin/users/create");
                console.log(erro)
            });
        } else {
            resp.render("admin/users/create",{
                email: email,
                erro: " Já existe"
            });
        }
    })
});

router.get("/admin/users/edit/:id", (req,resp) => {
    var id = req.params.id;

    if (id != undefined && !isNaN(id)) {
        User.findByPk(id).then(user=>{
            resp.render("admin/users/edit",{
                user:user
            })
        }).catch(errp=> {
            resp.redirect("/admin/users");
        })
    } else {
        resp.redirect("/admin/users");
    }
});

router.post('/users/update', (req, resp) => {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);


    if (id != undefined && !isNaN(id)) {
        User.update({
            email: email,
            password: hash
        },{
            where: {
                id: id
            }
        }).then(() => {
            resp.redirect("/admin/users");
        })
    } else {
        resp.redirect("/admin/users");
    }
});

router.post('/users/delete', (req,resp) => {
    var id = req.body.id;

    if (id != undefined && !isNaN(id)) { 
            User.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                resp.redirect("/admin/users");
            });
    } else { 
        resp.redirect("/admin/users");
    }
});

module.exports = router;
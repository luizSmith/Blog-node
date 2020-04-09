const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, resp) => {
    resp.send("Listagem de usuarios");
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


module.exports = router;
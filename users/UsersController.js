const express = require("express");
const router = express.Router();
const User = require("./User");

router.get('/admin/users', (req, resp) => {
    resp.send("Listagem de usuarios");
});

router.get('/admin/users/create', (req, resp) => {
    resp.render("admin/users/create");
});

router.post('/user/create',(req,resp) => {
    var email = req.body.email;
    var password = req.body.password;

    resp.json({
        email,
        password
    })
});


module.exports = router;
const express = require("express");
const router = express.Router();

//objeto utilizado para criar as rotas
router.get('/admin/categories/new', (req, resp) => {
    resp.render("admin/categories/new");
});

module.exports = router;
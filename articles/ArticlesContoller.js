const express = require("express");
const router = express.Router();

//objeto utilizado para criar as rotas
router.get('/articles', (req, resp) => {
    resp.send("ROTA ARTICLES");
});

module.exports = router;
const express = require("express");
const router = express.Router();

//objeto utilizado para criar as rotas
router.get('/categories', (req, resp) => {
    resp.send("ROTA CATEGORIAS");
});

module.exports = router;
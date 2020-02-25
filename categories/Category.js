const Sequelize = require('sequelize');
const connection = require("../database/database");

const Category = connection.define('tb_categories',{
    title:{ //nome categoria
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: { //apelido para a rota
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({ //sincroniza o banco
    force: false
}).then(() => {
    console.log("alteracoes de categoria realizadas com sucesso");
})

module.exports = Category;
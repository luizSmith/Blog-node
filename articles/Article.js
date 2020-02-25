const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = require("../categories/Category");

const Article = connection.define('tb_article',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//Criando relacionamento de tabelas
Category.hasMany(Article); // Uma categoria tem muitos artigos.
Article.belongsTo(Category); // um artigo pertence a uma categoria.

// Article.sync({ //sincroniza o banco
//     force: false
// }).then(() => {
//     console.log("Tabela Article sincronizada");
// })

module.exports = Article;
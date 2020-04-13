const Sequelize = require('sequelize');
const connection = require("../database/database");

const User = connection.define('tb_users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({ //sincroniza o banco
    force: false //só recria a tabela se ela não existir
}).then(() => {
    console.log("Tabela User sincronizada");
})

module.exports = User;
const sequelize = require('sequelize');

const connection = new sequelize('blog_node','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;


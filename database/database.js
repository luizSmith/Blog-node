const sequelize = require('sequelize');

const connection = new sequelize('blog_node','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;


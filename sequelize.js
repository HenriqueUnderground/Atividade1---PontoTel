//Conexão com o banco de dados

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })
 
module.exports = sequelize;

//Conexão com o banco de dados

const sqlite3 = require('sqlite3');

//cria novo banco de dados "usuario.db" 
//ou abre banco de dados "usuario.db" existente 
let db = new sqlite3.Database('db/.usuarios.db');



module.exports = db;
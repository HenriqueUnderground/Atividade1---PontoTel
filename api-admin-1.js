const sqlite3 = require('sqlite3').verbose()
//const md5 = require('md5')
const express = require('express');
const app = express ();
var router = express.Router();
var bodyParser = require("body-parser");

//const database = require("./db.js");



//Porta do administrador
var HTTP_PORT = 3000					//http://localhost:3000

//Start server
app.listen(HTTP_PORT, () => {
    console.log("Admin Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});




//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//importa módulo banco de dados sqlite
let db = new sqlite3.Database('db/usuarios.db')

//Conectar com os arquivos estáticos
app.use(express.static('private'));


//páginainicial
//app.get("/", (req, res, next) => {
//	res.sendFile(__dirname + '/private/admin.html');
//});

//menu
//app.post("/adm/login", (req, res, next) => {
//	res.sendFile(__dirname + '/opções/admin.html');
//}

//ROTA BUSCAR LISTA DE USUÁRIOS
app.get("/admin/users", (req, res, next) => {
    var sql = "SELECT * FROM user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});



//ROTA LISTA USUÁRIOS
app.get("/admin/lista", (req, res) => {
    var sql = "SELECT * FROM userdata"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send({
            "message":"success",
            "data":rows
        })
		rows.forEach((row) => {			//pra cada linha, mostra o nome
	  		console.log(row.name);
  		});
    });
});




//ROTA BUSCAR USUÁRIO ESPECÍFICO 
app.get("/admin/user/:id", (req, res, next) => {
    var sql = "SELECT * FROM userdata where rowid = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


/*
//ROTA ADICIONAR USUÁRIO  
app.post("/admin/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
*/



/*
app.patch("/admin/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
});
*/


/*
//ROTA DELETAR USUÁRIO 
app.delete("/admin/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM userdata WHERE rowid = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})
*/

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});



module.exports = router;
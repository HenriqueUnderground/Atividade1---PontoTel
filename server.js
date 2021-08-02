//Back-end Para a Atividade 1


//IMPORTAR DEPENDÊNCIAS
const express = require ('express');
const app = express ();
const bodyParser = require("body-parser");		
const path = require('path');
//const session = require('express-session');		//módulo de sessão
const ejs = require('ejs');
//var cookieSession = require('cookie-session');
var admin = require('./api-admin-1.js')


const sqlite3 = require('sqlite3');
const database = require("./sequelize.js");				//importa módulo banco de dados sqlite
let db = new sqlite3.Database('db/usuarios.db');


//APLICAÇÕES EXPRESS

//Criando servidor
//porta de saída
const port = 8000;							//http://localhost:8000
app.listen (port, () => {
	console.log(`funcionando na porta 
	http://localhost:${port}`);
});

var logado = 0;



//Conectar com os arquivos estáticos
app.use(express.static(__dirname + '/public'));

/*
//Configurar sessões
app.use(session({						    
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
*/

//bodyParser traduz as requisições
app.use(bodyParser.json());					
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text({ type: 'text/html' }));

//template ejs
app.set('views', 'public');
app.set('view engine', 'ejs');

//cookie session
//app.use(cookieSession({
//  name:'session',
  //secret: '123',
//  signed: true,
//  keys: ['blablabla'],
//   maxAge: 24 * 60 * 60 * 1000
//}));


//ROTAS

//Rota raiz

app.get('/',(req,res) => {
	console.log(logado);
	if (logado==0) {
		res.sendFile(__dirname + '/public/login.html');
	}
	else
		res.redirect(301,'/Profile?=id'+logado.id);
});

//Rotas

//teste solicitação da raiz do site
/*
app.post('/Cadastrado',(req,res) => {
	res.send("testando, 1,2,3");
});
*/


app.get('/Profile',(req,res) => {
	if (logado==0)
		res.sendFile(__dirname + '/public/login.html');
	else 
		res.render(__dirname + '/public/Cadastrado',{row:logado});
	
});





//Rota de autenticação de login
app.post('/login', function(req, res, next) {				
	var username = req.body.email;
	var password = req.body.senha;				
	if (username && password) {							//verifica se a pessoa colocou e-mail e senha
			
	var sql = 'SELECT rowid AS id, senha AS senha, nome AS nome, senha FROM userdata WHERE email = ? AND senha= ?';
    var params = [username,password];
    db.get(sql, params, (err, row) => {		
			if (row) {
				logado = row;
				//request.session.loggedin = true;		//requisita uma sessão
				//request.session.username = username;
				//req.session.name = logado.id;
				console.log(row.nome);
				console.log(logado);
				res.redirect(301,'/');
				//res.location('/Cadastrado');
				//res.render(__dirname + '/public/Cadastrado',{row:row});	
				//res.json({
           		//	 "message":"success",
            	//	 "data":row.id,
				//	 "redirect":"/Cadastrado"
        		//});	
				//response.location('/Cadastrado?id='+row.id); 
				console.log('Usuário cadastrado');
				console.log('o id é = ' +row.id);
				//app.get('/Profile',(req,res) => {
				//	req.session.name = 'Webtutorials.ME';
				//	res.render(__dirname + '/public/Cadastrado',{row:row});
				//});
			}
			
			else {
				res.send('E-mail, CPF, PIS ou senha incorretos!');
				console.log('Login incorreto');
			}	
		res.end();			
	});
	}
	else {
		res.send('Por favor, coloque o!');
		next();
	}
});





//ROTA Logout
app.get('/logout',(req,res) => {
	//console.log(req.session.name);
	console.log("aqui");
	logado=0;
	//console.log(logado);
	res.redirect(301,'/');
});




//Rota de Cadastro de Usuário
app.post('/add/user',(req,res,next) => {
	// constrói a função de inserção com múltiplos placeholders
	// baseados no número de linhas

	var sql = `INSERT INTO userdata
		(nome,email,pais,estado,
		municipio,cep,rua,numero,
		complemento,cpf,pis,senha)
		VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
	var params = [req.body.nome,req.body.email,req.body.pais,req.body.estado,req.body.municipio,req.body.cep,req.body.rua,req.body.numero,req.body.complemento,req.body.cpf,req.body.pis,req.body.senha];
    	
	db.run(sql, params, function (err, result) {
	    if (err){
			res.status(400).json({"error": err.message})
			return;
		}  
		console.log(`Rows inserted ${this.changes}`);
		res.render(__dirname + '/public/Cadastrado',{row:result});
	});
});






app.get('/Editar',(req,res) => {
	res.sendFile(__dirname + '/public/Editar.html');
});


//Preenchimento automático do formulário
app.get('/fillform',(req,res) =>{
	console.log(logado.id);
	var sql = 'SELECT * FROM userdata WHERE rowid = ?';
    if (logado==0)
		res.json({"message":"sem sucesso"});	
	var params = [logado.id];
    console.log("teste");
	db.get(sql, params, (err, row) => {		
			if (row) {
				console.log(row);
				res.json({row});
				res.end();
			}
			else
				console.log("falhou");
	});
});


//Rota de Edição de dados
app.post('/edit',(req,res) => {
	  db.run(
		  `UPDATE userdata SET 
			 nome = coalesce(?,nome), 
			 email = COALESCE(?,email),
			 pais = COALESCE(?,pais),
			 estado = COALESCE(?,estado),
			 municipio = COALESCE(?,municipio),
			 cep = COALESCE(?,cep),
			 rua = COALESCE(?,rua),
			 numero = COALESCE(?,numero),
			 complemento = COALESCE(?,complemento),
			 cpf = COALESCE(?,cpf),
			 pis = COALESCE(?,pis),
			 senha = COALESCE(?,senha) 
			 
			 WHERE rowid = ?`,
		 [req.body.nome,req.body.email,req.body.pais,req.body.estado,req.body.municipio,req.body.cep,req.body.rua,req.body.numero,req.body.complemento,req.body.cpf,req.body.pis,req.body.senha,logado.id],
		  (err, result) => {
			  if (err){
				  res.status(400).json({"error": res.message})
				  return;
			  }
			  logado.nome=req.body.nome;
			  //console.log(`Row(s) updated: ${this.changes}`);
			  res.redirect(301,'/');
	  	});
});




//ROTA DELETAR
app.get('/deletar',(req,res) => {
    db.run(
        'DELETE FROM userdata WHERE rowid = ?',
        logado.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            console.log("Usuário logado.id deletado"+ logado);
			logado=0;
			res.sendFile(__dirname + '/public/login.html');
    	});
})





//Manipulador de erros
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}


/*
// Resposta padrão para outras requisições 
app.use(function(req, res){
    res.status(404);
});
*/








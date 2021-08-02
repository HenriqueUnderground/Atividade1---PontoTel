// JavaScript Document


//
//**Apenas em páginas de usuário cadastrado**
/*Mostra o nome do usuário logado no título da página,
no formato "Olá {Nome_do_usuário}"*/
// 

 //jsonxhr("/login");
 //alert(cadjson.message);
 
 /*	
 	var requestURL = '/login'
 	var xhr = new XMLHttpRequest();
 	xhr.open("GET", requestURL , true);
	request.responseType = 'json';
	request.send();
*/
 
/* 
 	var requestURL = '/login'
	
 	var xhr = new XMLHttpRequest();
    xhr.onload = function () {
	  if( this.status===200)	{
	  	try {
			var resObj = JSON.parse(this.responseText);
		}catch (e) {
		alert('tem um erro');
	}
	 }
	xhr.open("GET", requestURL , true);
	xhr.send();
	}
*/	
	
/* 
 //function jsonxhr (url) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		 // var reqjson = JSON.parse(this.responseText);
	  }
	};
	xhr.open("GET", '/login' , true);
	xhr.send();
	//alert(reqjson.message);
	//}
*/

if (document.getElementById("cadastrado")){
	
  //var l=document.getElementById("cadastrado");
  //createText(l,"Olá"+" "+"Nome");
  
  //cria um texto para inserir em um elemento
  function createText (pai,texto) {                
	var t = document.createTextNode(texto);    
	pai.appendChild(t);                                   
  }
 
}
/*  
  'use strict'
	function reqListener (data) {
	document.body.innerHTML += this.responseText;
	}
	var loginReq = new XMLHttpRequest();
	loginReq.addEventListener("load", reqListener);
	loginReq.open("GET", "/login");	
	loginReq.send();
}
*/


//
//**Apenas na páginas de edição de cadastro**

if (document.getElementsByClassName("edit1")[0]){
	 
/*Preenche a área de edição com os dados do cadastro*/	
	document.getElementsByName("nome")[0].value="Henrique Ricci";
	document.getElementsByName("e-mail")[0].value="email@hotmail.com";
	document.getElementsByName("pais")[0].value="Brasili";
	document.getElementsByName("estado")[0].value="SP";
	document.getElementsByName("municipio")[0].value="cidade";
	document.getElementsByName("cep")[0].value="00000-000";
	document.getElementsByName("rua")[0].value="rua hauhuahua";
	document.getElementsByName("numero")[0].value="888";
	document.getElementsByName("complemento")[0].value="nenhum";
	document.getElementsByName("cpf")[0].value="5181815151-112";
}



function validateForm(x) {
	var inputs = document.getElementById(x).elements;
	for (i = 0; i < inputs.length; i++) {
  		if (inputs[i].nodeName ==="INPUT"  && inputs[i].value === "") {
			alert("O campo"+" "+"''"+inputs[i].placeholder+"''" +""+ "está vazio");
			return false;
		}
	}	
}


function redirect(x) {
       window.location.href=x;  
     }


function validateForm2(x) {
	
	if (validateForm(x))
		return false;
		
		var senha= document.getElementById("senha");
		var confsenha= document.getElementById("confsenha");
	if (senha.value != confsenha.value) {
		senha.focus();
		alert("A senha e a confirmação precisam ser iguais");
    	return false;
	}
	if (document.getElementById("CPF")) {
	}
	if (document.getElementById("CEP")) {
	}
	if (document.getElementById("Estado")) {
	}
	if (document.getElementById("Municipio")) {
	}
	if (document.getElementById("Rua")) {
	}
	if (document.getElementById("Numero")) {
	}
}



/*
function validateForm() {
  let x = document.forms["flogin"]["cpf"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
*/




/*

function validarForm2() {
  const inpObj = document.forms["flogin"]["e-mail"].value;
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  } 
*/










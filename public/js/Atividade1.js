// JavaScript Document


//
//**Apenas em páginas de usuário cadastrado**
/*Mostra o nome do usuário logado no título da página,
no formato "Olá {Nome_do_usuário}"*/
// 

 
//Preenchimento automático do formulário de edição
if (document.getElementsByClassName("edit1")[0]){
	
  var json1;	
  var xhr = new XMLHttpRequest();
  var url = "/fillform";
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function (json1) {
	  if (xhr.readyState === 4 && xhr.status === 200) {
	  	json1 = JSON.parse(xhr.responseText);
		  
		document.getElementsByName("nome")[0].value=json1.row.nome;
  	  	document.getElementsByName("email")[0].value=json1.row.email;
  	   	document.getElementsByName("pais")[0].value=json1.row.pais;
  	    document.getElementsByName("estado")[0].value=json1.row.estado;
       	document.getElementsByName("municipio")[0].value=json1.row.municipio;
		document.getElementsByName("cep")[0].value=json1.row.cep;
		document.getElementsByName("rua")[0].value=json1.row.rua;
		document.getElementsByName("numero")[0].value=json1.row.numero;
		document.getElementsByName("complemento")[0].value=json1.row.complemento;
		document.getElementsByName("cpf")[0].value=json1.row.cpf;
		document.getElementsByName("pis")[0].value=json1.row.pis;  
		  
	  }	 
 }
}


//Preenche o formulário com valores-teste
//**Apenas na páginas de cadastro**
if (document.getElementsByClassName("teste1")[0]){
	 
/*Preenche a área de edição com os dados do cadastro*/	
	document.getElementsByName("nome")[0].value="Teste";
	document.getElementsByName("email")[0].value="teste@teste.com";
	document.getElementsByName("pais")[0].value="Teste";
	document.getElementsByName("estado")[0].value="Teste";
	document.getElementsByName("municipio")[0].value="teste";
	document.getElementsByName("cep")[0].value="00040-000";
	document.getElementsByName("rua")[0].value="rua hauhuahua";
	document.getElementsByName("numero")[0].value="888";
	document.getElementsByName("complemento")[0].value="nenhum";
	document.getElementsByName("cpf")[0].value="5181815151-112";
	document.getElementsByName("pis")[0].value="2525255252-112";
}



function validateForm(x) {
	var inputs = document.getElementById(x).elements;
	for (i = 0; i < inputs.length; i++) {
  		if (inputs[i].nodeName ==="INPUT"  && inputs[i].value === "") {
			alert("O campo"+" "+"''"+inputs[i].placeholder+"''" +""+ "está vazio");
			return false;
		}
	}
	return true;	
}


function redirect(x) {
       window.location.href=x;  
}



//Funções de validação
function validateForm2(x) {
	
	if (validateForm(x)==false)
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



function validarForm() {
	var email= document.getElementById("email");
	if (!validateEmail(email)) { 
		if(!validateCPF(email.value)) {
			parseInt(email.value,10);
			if (isNaN(email.value)) {
		alert(email.value);}
			if(!validatePIS(email.value)) {	
				alert("Insira e-mail, PIS ou CPF válido");
				return false;
			}
		}
	}	 		
}
    
/*
function validateEmail(x) {
  		var re = /\S+@\S+\.\S+/;
  		return re.test(x);		
}
*/

function validateEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
  
  if ((usuario.length >=1) &&
	  (dominio.length >=3) &&
	  (usuario.search("@")==-1) &&
	  (dominio.search("@")==-1) &&
	  (usuario.search(" ")==-1) &&
	  (dominio.search(" ")==-1) &&
	  (dominio.search(".")!=-1) &&
	  (dominio.indexOf(".") >=1)&&
	  (dominio.lastIndexOf(".") < dominio.length - 1)) {
	   return true;
  }
  else{
	   return false;
  }
}


function validateCPF(cpf) {
	var Soma;
    var Resto;
    Soma = 0;
  	if (cpf == "00000000000") return false;

  	for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  	Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

 	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}



function validatePIS(pis){
total=0;
resto=0;
numPIS=0;
strResto="";
	
	numPIS=pis;
			
	if (numPIS=="" || numPIS==null || isNaN(pis)){
		return false;
	}
	
	for(i=0;i<=9;i++){
		resultado = (numPIS.slice(i,i+1))*(ftap.slice(i,i+1));
		total=total+resultado;
	}
	resto = (total % 11)
	
	if (resto != 0){
		resto=11-resto;
	}
	
	if (resto==10 || resto==11){
		strResto=resto+"";
		resto = strResto.slice(1,2);
	}
	
	if (resto!=(numPIS.slice(10,11))){
		return false;
	}
	return true;
}
 












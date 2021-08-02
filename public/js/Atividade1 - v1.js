// JavaScript Document



//
//**Apenas em páginas de usuário cadastrado**
/*Mostra o nome do usuário logado no título da página,
no formato "Olá {Nome_do_usuário}"*/
//
if (document.getElementById("cadastrado")){
	
  var l=document.getElementById("cadastrado");
  createText(l,"Olá"+" "+"Nome");
  
  //cria um texto para inserir em um elemento
  function createText (pai,texto) {                
	var t = document.createTextNode(texto);    
	pai.appendChild(t);                                   
  }
}


//
//**Apenas na páginas de edição de cadastro**

if (document.getElementsByClassName("edit1")[0]){
	 
/*Dá o "nome" dos inputs às divs que os contém*/	 
	 var n=document.getElementById("cad2").getElementsByTagName("div");
	 for (i=0;i<n.length;i++) {
	  n[i].id = n[i].getElementsByTagName("input")[0].name;
	 }

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





/*
function validateForm() {
  let x = document.forms["flogin"]["cpf"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}


function validarForm2() {
  const inpObj = document.forms["flogin"]["e-mail"].value;
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  } 
*/










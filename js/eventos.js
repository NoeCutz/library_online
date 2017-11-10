/**
 * Created by noecutz on 17/10/17.
 */

var jsonUsers = {};

jsonUsers.users = [];

function User(user, password, name, email, telephone, login) {
    this.user = user;
    this.password = password;
    this.name = name;
    this.email = email;
    this.telephone = telephone;
    this.login = login;
}



window.onload = function () {
    loadUsers();
    eventProfile();
    init();

    function eventProfile() {
        var perfil = document.getElementById("usuario");
        perfil.onclick = function () {
            if (sessionStorage.username) {
                logout();
            } else {
                location.href = "login.html"
            }

        }
    }

    function init() {

        content = document.getElementById("nombre_usuario");

        if(sessionStorage.username){
            content.innerHTML = sessionStorage.username;
        }

    }

    function loadUsers() {
        if(localStorage.users){
            jsonUsers = JSON.parse(localStorage.getItem("users"));
            console.log(jsonUsers);
        }
    }

};


function login(form){

    var i;
    var user = form["usuario_input"].value;
    var password = form["contrasena"].value;
    var content_valid = document.getElementById("validacion_login");

    console.log(user);

    for (i=0; i<jsonUsers.users.length;i++){
        console.log(jsonUsers.users[i].user);
        if(jsonUsers.users[i].user == user){
            if(jsonUsers.users[i].password == password){
                //userLogin = new User(users[i].user, users[i].password, users[i].name, users[i].email, users[i].telephone, true);
               console.log("contraseña iguales");

                sessionStorage.setItem("username", jsonUsers.users[i].user);
                return true;
            }else{
                content_valid.innerHTML = "Contraseña incorrecta";
                return false
            }
        }

    }
    content_valid.innerHTML = "Usuario y contraseña incorrectos";
    return false;

}

function logout() {
    var answer = confirm("¿Desea cerrar su sesión?");


    if(answer){
        sessionStorage.removeItem("username");
        alert("Tu sesion se ha cerrado");
        location.href = "login.html"
    }


}


function signup(form) {
    var contrasena = form["contrasena"].value;
    var contrasena_repeat = form["contrasena_repeat"].value;
    var content_valid = document.getElementById("validacion_login");

    if(existsUser(form["usuario_input"].value)){
        content_valid.innerHTML = "Usuario Ya registrado";
        return false;
    }

    if(contrasena != contrasena_repeat){
        contrasena.value = "";
        contrasena_repeat.value = "";
        content_valid.innerHTML = "Contraseñas no coinciden";
        return false;
    }

    if(existsEmail(form["email"].value)){
        content_valid.innerHTML = "Email Ya registrado";
        return false;
    }

    if(existsTelephone(form["telephone"].value)){
        content_valid.innerHTML = "Telefono Ya registrado";
        return false;
    }

    saveUser(form);
    return true;

}


function saveUser(form) {
    var json = { "user" : form["usuario_input"].value , "password": form["contrasena"].value
         , "name": form["name"].value, "email": form["email"].value , "telephone": form["telephone"].value };

    jsonUsers.users.push(json);

    localStorage.setItem("users", JSON.stringify(jsonUsers));

}

function existsUser(user) {
    for (i=0; i<jsonUsers.users.length;i++){
        if(jsonUsers.users[i].user == user){
           return true;
        }
    }
    return false;
}

function existsEmail(email) {
    for (i=0; i<jsonUsers.users.length;i++){
        if(jsonUsers.users[i].email == email){
            return true;
        }
    }
    return false;
}

function existsTelephone(telephone) {
    for (i=0; i<jsonUsers.users.length;i++){
        if(jsonUsers.users[i].telephone == telephone){
            return true;
        }
    }
    return false;
}

//Shopping list


function loadCart() {
    var keys= Object.keys(localStorage);
    for (var i=0; i<keys.length; i++){
        var element= JSON.parse(localStorage.getItem(keys[i]));
        addElementsToBody(element);
    }
    showTotal(keys.length);
}

function addElementsToBody(element) {
    var inserElementCode = "<tr><td>" +element[0]+"</td>";
    inserElementCode+= "<td>"+ element[1]+"</td>";
    inserElementCode+= "<td><input type='button' class='delete' value='Eliminar' onclick=\"deleteElement(this)\"></td>";
    document.getElementById("tableBody").innerHTML +=inserElementCode;
}

function deleteElement(button) {
    var row = button.parentNode.parentNode;
    localStorage.removeItem(row.cells[0].innerHTML);
    location.reload();
}
function showTotal(length) {
    var table = document.getElementById("shopping_cart");
    var total=0;
    if (length>0){
        for(var i=0;i<length; i++){
            total+= parseFloat(table.rows[i+1].cells[1].innerHTML);
        }
    }
    document.getElementById("cost_total").innerHTML=total.toString();
}


function emptyCart() {
    localStorage.clear();
    location.reload();
}


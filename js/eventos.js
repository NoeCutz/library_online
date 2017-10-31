/**
 * Created by noecutz on 17/10/17.
 */
var users ;
 
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

    function eventProfile() {
        var perfil = document.getElementById("usuario");
        perfil.onclick = function () {
            if (sessionStorage.username) {
                location.href = "perfil.html"
            } else {
                location.href = "login.html"
            }

        }
    }
};





function loadUsers() {
    var xmlhttp = new XMLHttpRequest(),
        url="";
    url ="bd/users.json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            users = JSON.parse(xmlhttp.responseText);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function login(form){

    var i;
    var user = form["usuario_input"].value;
    var password = form["contrasena"].value;
    var content_valid = document.getElementById("validacion_login");

    loadUsers();


    for (i=0; i<users.length;i++){
        if(users[i].user == user){
            if(users[i].password == password){
                //userLogin = new User(users[i].user, users[i].password, users[i].name, users[i].email, users[i].telephone, true);
                sessionStorage.setItem("username", users[i].user);
                return true;
            }else{
                content_valid.innerHTML = "Contraseña incorrecta";
                content_valid.style.color = "red";
                return false
            }
        }
        content_valid.innerHTML = "Usuario y contraseña incorrectos";
        content_valid.style.color = "red";
        return false;
    }

    return false;

}

function logout() {
    sessionStorage.removeItem("username");
}





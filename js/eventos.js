/**
 * Created by noecutz on 17/10/17.
 */

var jsonUsers = {};

jsonUsers.users = [];

var total = 0;

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

    $("#menu_button").click(function () {
        menu_class = $("nav ul").attr("class");


        if(menu_class != undefined){
            if(menu_class.indexOf("visible")>-1){
                $("nav ul").removeClass("visible");
            }else{

                $("nav ul").addClass("visible");
            }
        }else{
            $("nav ul").addClass("visible");
        }
    });


    var table_shopping = document.getElementById("shopping_cart");
    var pagos = document.getElementById("content_pago");
    if(table_shopping !=  undefined){
        loadCart()
    }

    if(pagos !== undefined && pagos !== null){
        loadPayment();
    }
    function eventProfile() {
        var perfil = document.getElementById("usuario");
        perfil.onclick = function () {
            if (sessionStorage.username) {
                location.href = "profile.html";
            } else {
                location.href = "login.html";
            }

        }
    }

    var content_profile = document.getElementById("content_profile");
    if(content_profile != undefined){
        showDataUser();


        $("#button_logout").click(function () {
            logout();
        });

        $("#button_update_password").click(function () {
            $("#new_password").show();
            $("#new_password_repeat").show();
            $(this).val("Actualizar");
        });

        $("#new_password").hide();
        $("#new_password_repeat").hide();


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


    function loadCart() {
        var keys= Object.keys(sessionStorage);
        var numItems = 0;


        for (var i=0; i<keys.length; i++){

            if(keys[i] != "username") {
                var element= JSON.parse(sessionStorage.getItem(keys[i]));
                addElementsToBody(element);
                numItems++;
            }

        }
        showTotal(numItems);
    }






    function addElementsToBody(element) {
        var inserElementCode = "<tr><td>" +element[0]+"</td>";
        inserElementCode+= "<td>"+ element[1]+"</td>";
        inserElementCode+= "<td><input type='button' class='delete' value='Eliminar' onclick=\"deleteElement(this)\"></td>";
        document.getElementById("tableBody").innerHTML +=inserElementCode;
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
        sessionStorage.removeItem("username");
        location.href = "login.html"
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


function updatePassword(form) {
    var contrasena = form["password_profile"].value;
    var contrasena_repeat = form["password_repeat_profile"].value;
    var user = form["user_profile"].value;

    var content_valid = document.getElementById("validacion_update");

    if(contrasena != contrasena_repeat){
        contrasena.value = "";
        contrasena_repeat.value = "";
        content_valid.innerHTML = "Contraseñas no coinciden";
        return false;
    }

    var userUpdate;
    var indexUser;

    for (i=0; i<jsonUsers.users.length;i++){
        if( jsonUsers.users[i].user == user ){
            userUpdate= jsonUsers.users[i];
            indexUser = i;
        }

    }

    userUpdate.password = contrasena;

   console.log("userUpdate", userUpdate);

    jsonUsers.users.splice(indexUser,1,userUpdate);

    localStorage.setItem("users", JSON.stringify(jsonUsers));
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


function showDataUser() {
    var user;

    for (i=0; i<jsonUsers.users.length;i++){
        if(jsonUsers.users[i].user == sessionStorage.username){
            user = jsonUsers.users[i];
        }
    }
    document.getElementById("user_profile").value = user.user;
    document.getElementById("name_profile").value = user.name;
    document.getElementById("email_profile").value = user.email;
    document.getElementById("telephone_profile").value = user.telephone;


}


//Shopping list


function deleteElement(button) {
    var row = button.parentNode.parentNode;
    sessionStorage.removeItem(row.cells[0].innerHTML);
    location.reload();
}


function emptyCart() {
    sessionStorage.clear();
    location.reload();
}

function addToCart(name, price) {
    var book=[name,price];
    sessionStorage.setItem(name,JSON.stringify(book));
}
function addToCart_P() {
    var name = document.getElementById("titulo").innerHTML;
    var price=document.getElementById("prod-precio").innerHTML;
    addToCart(name,price);
    showAlertDiv(name,price);
    
}
function addToCart_I(item) {
    var node= item.parentNode;
    var name= node.getElementsByClassName("bookName")[0].innerHTML;
    var price = node.getElementsByClassName("bookPrice")[0].innerHTML;
    addToCart(name,price);
    showAlertDiv(name,price);

}

function checkStates() {
    var pais = $("#pais-pago").val();
    if(pais !== "MEX"){
        $("#estado-pago").prop('disabled', true);
    }else{
        $("#estado-pago").prop('disabled', false);

    }
}

function loadPayment() {
    var keys= Object.keys(sessionStorage);
    var numItems = 0;
    total=0;


    for (var i=0; i<keys.length; i++){

        if(keys[i] != "username") {
            var element= JSON.parse(sessionStorage.getItem(keys[i]));
            total += parseFloat(element[1]);
            numItems++;
        }

    }

    document.getElementById("cantidad-prods").innerHTML=numItems.toString();
    total.toFixed(2);
    document.getElementById("costo-prods").innerHTML="$ " +  total.toFixed(2).toString();


    var radios = document.getElementsByName('forma-envio');

    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
           var  envio = parseFloat(radios[i].value);
            document.getElementById("costo-envio").innerHTML="$ "+ envio.toFixed(2);
            total += parseFloat(envio);
            break;
        }
    }



    document.getElementById("total-prods").innerHTML="$ " +  total.toFixed(2).toString();
}

function showAlertDiv(name, price) {
    $(".alertingdivbg").show();
    $(".alertingdiv")[0].innerHTML = "<span>Se a&ntildeadio: <br><b> " +name + "</b> por  <b>$" + price + " </b><br> al carrito</span>"
    setTimeout(function () {
        $(".alertingdivbg").hide();
    },1000)
}
function pagar() {
    var tarjeta = $("#tarjeta").val();
        $(".alertingdivbg").show();
        $(".alertingdiv")[0].innerHTML = "<span>Se cobraron: <br><b> $" + total.toFixed(2) + "</b> en la tarjeta <br> <b>" + tarjeta + " </b> </span>"
        setTimeout(function () {
            $(".alertingdivbg").hide();
        },4000)
    emptyCart();
}
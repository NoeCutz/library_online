
function loadBooks(){ //sets books for test
    var book0 = ["Alquimista","350"]; //Datos de libro a guardar
    var book1=["Principito","123"];
    var book2=["Soy un gato","600"];
    localStorage.setItem("Alquimista", JSON.stringify(book0)); //metodo para guardar, key debe ser unico
    localStorage.setItem("Principito", JSON.stringify(book1));
    localStorage.setItem("Soy un gato", JSON.stringify(book2));
}


window.onload = function() {
    loadBooks();
    var keys= Object.keys(localStorage);
    for (var i=0; i<keys.length; i++){
        var element= JSON.parse(localStorage.getItem(keys[i]));
        addElementsToBody(element);
    }
};

function addElementsToBody(element) {
    var inserElementCode = "<tr><td>" +element[0]+"</td>";
    inserElementCode+= "<td>"+ element[1]+"</td>";
    inserElementCode+= "<td><input type='button' class='delete' value='Eliminar' onclick=\"deleteElement("+element[0] +")\"></td>";
    document.getElementById("tableBody").innerHTML +=inserElementCode;
}

function deleteElement(key) {
    console.log(key.toString());
    localStorage.removeItem(key);

}
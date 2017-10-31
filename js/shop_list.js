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
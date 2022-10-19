var pid = [];
var pname = [];
var pprice = [];
var pquantity = [];
var pdescription = [];

getDataProducts();

function getDataProducts() {
    db.collection("products")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data().name);
                pid.push(doc.data().id);
                pname.push(doc.data().name);
                pprice.push(doc.data().price);
                pquantity.push(doc.data().quantity);
                pdescription.push(doc.data().description);
            });
            getPValues();
        });
}

function getPValues() {
    console.log(pid.length);
    for (i = 0; i < pid.length; i++) {
        setPTable(pid[i], pname[i], pprice[i], pquantity[i], pdescription[i]);
    }
}

function setPTable(id, name, price, quantity, description) {
    var tbl = document.getElementById("tableProducts");
    var row = tbl.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    cell1.innerHTML = id;
    cell2.innerHTML = name;
    cell3.innerHTML = price;
    cell4.innerHTML = quantity;
    cell5.innerHTML = description;
}

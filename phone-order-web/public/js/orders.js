getFirestoreProducts();

function getFirestoreProducts() {
    db.collection("orders").orderBy("orderId", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var oid = doc.data().orderId;
                var pid = doc.data().productId;
                var date = doc.data().date;
                var pname = doc.data().productName;
                var price = doc.data().price;
                var quantity = doc.data().quantity;
                var cname = doc.data().name;
                var ctelephone = doc.data().telephone;
                var cemail = doc.data().email;
                var caddress = doc.data().address;
                var cnotes = doc.data().notes;

                console.log(doc.id, " => ", doc.data());

                setProductTable(oid, pid, date, pname, price, quantity, cname, ctelephone, cemail, caddress, cnotes);
            });
        });
}

function setProductTable(oid, pid, date, pname, price, quantity, cname, ctelephone, cemail,caddress, cnotes) {
    var tbl = document.getElementById("tableOrders");
    var row = tbl.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();
    var cell8 = row.insertCell();
    var cell9 = row.insertCell();
    var cell10 = row.insertCell();
    var cell11 = row.insertCell();
    cell1.innerHTML = oid;
    cell2.innerHTML = pid;
    cell3.innerHTML = date;
    cell4.innerHTML = pname;
    cell5.innerHTML = price;
    cell6.innerHTML = quantity;
    cell7.innerHTML = cname;
    cell8.innerHTML = ctelephone;
    cell9.innerHTML = cemail;
    cell10.innerHTML = caddress;
    cell11.innerHTML = cnotes;
}
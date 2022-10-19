var up_id;
var up_name;
var up_price;
var up_quantity;
var up_description;

function updateData() {
    up_id = document.getElementById("updateid").value;
    up_name = document.getElementById("updatename").value;
    up_price = document.getElementById("updateprice").value;
    up_quantity = document.getElementById("updatequantity").value;
    up_description = document.getElementById("updatedescription").value;

    orderUpdate();
}

function orderUpdate() {
    var texts = [up_id, up_name, up_price, up_quantity, up_description];
    if (validate(texts)) {
        if (confirm("Are You Sure Update This Product?")) {
            console.log("You pressed OK!");
            UpdateFirestoreData();
        } else {
            console.log("You pressed CANCEL!");
        }
    }
}

function UpdateFirestoreData() {
    var docRef = db.collection("products").doc(up_id);

    var link = document.getElementById('updateimage').src;
    console.log(link);

    return docRef
        .update({
            id: up_id,
            image: link,
            name: document.getElementById("updatename").value,
            price: document.getElementById("updateprice").value,
            quantity: document.getElementById("updatequantity").value,
            description: document.getElementById("updatedescription").value,
        })
        .then(() => {
            console.log("Document successfully Updated!");
            window.alert(
                "Successfully Updated " + document.getElementById("addname").value
            );
            clearUpdateUi();
            getFirestoreProducts();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

function clearUpdateUi() {
    document.getElementById("updateimage").src = "./images/noimage.png";
    document.getElementById("updateid").value = "";
    document.getElementById("updatename").value = "";
    document.getElementById("updateprice").value = "";
    document.getElementById("updatequantity").value = "";
    document.getElementById("updatedescription").value = "";
}

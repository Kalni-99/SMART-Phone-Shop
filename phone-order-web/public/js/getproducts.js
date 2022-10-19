$("#addproductform").submit(function (e) {
  e.preventDefault();
});

$("#updateproductform").submit(function (e) {
  e.preventDefault();
});

var pid;
var pname;
var pprice;
var pquantity;
var pdescription;

getFirestoreProducts();

function getFirestoreProducts() {
  pid = [];
  pname = [];
  pprice = [];
  pquantity = [];
  pdescription = [];

  $("#tableProducts > tbody").html("");

  db.collection("products").orderBy("id", "desc")
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
      getProductsValues();
    });
}

function getProductsValues() {
  console.log(pid.length);
  for (i = 0; i < pid.length; i++) {
    setProductTable(pid[i], pname[i], pprice[i], pquantity[i], pdescription[i]);
  }

  $("#tableProducts tr").click(function () {
    $(this).addClass("bg-success").siblings().removeClass("bg-success");
    var $row = $(this).closest("tr"),
      $tds = $row.find("td:nth-child(1)");

    $.each($tds, function () {
      setUpdateData($(this).text());
    });
  });
}

function setProductTable(id, name, price, quantity, description) {
  var tbodyRef = document.getElementById('tableProducts').getElementsByTagName('tbody')[0];
  var row = tbodyRef.insertRow();
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

var updatename;
var updateid;
var updateprice;
var updatequantity;
var updatedescription;

function setUpdateData(id) {
  console.log(id);
  var docRef = db.collection("products").doc(id);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        document.getElementById("updateid").value = doc.data().id;
        document.getElementById("updatename").value = doc.data().name;
        document.getElementById("updateprice").value = doc.data().price;
        document.getElementById("updatequantity").value = doc.data().quantity;
        document.getElementById("updatedescription").value =
          doc.data().description;
        getProductImage(doc.data().image);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function getProductImage(link) {
  document.getElementById("updateimage").src = link;
}

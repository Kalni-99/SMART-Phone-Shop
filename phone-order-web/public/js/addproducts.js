var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();

document.getElementById('addimage').onclick = function (e) {
    var input = document.createElement('input');
    input.setAttribute("type", "file");
    input.click();

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById('addimage').src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
}

var ap_name;
var ap_price;
var ap_quantity;
var ap_description;

function addData() {
    ap_name = document.getElementById("addname").value;
    ap_price = document.getElementById("addprice").value;
    ap_quantity = document.getElementById("addquantity").value;
    ap_description = document.getElementById("adddescription").value;

    orderAdd();
}

function orderAdd() {
    var texts = [ap_name, ap_price, ap_quantity, ap_description];
    if (validate(texts)) {
        if (confirm("Are You Sure Add Product?")) {
            console.log("You pressed OK!");
            var id = CreateId();
            SaveImage(id);
        } else {
            console.log("You pressed CANCEL!");
        }
    }
}

function validate(dataSet) {
    var validation;
    for (var i = 0; i < dataSet.length; i++) {
        if (isEmptyOrSpaces(dataSet[i])) {
            validation = false;
            break;
        } else {
            validation = true;
        }
    }
    if (validation) {
        console.log("validation ok");
        return true;
    } else {
        console.log("validation null data found");
        return false;
    }
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function CreateId() {
    var now = new Date();
    return moment(now).format("YYYYMMDDHHmmss");
}

function SaveImage(id) {
    var uploadTask = firebase.storage().ref('product/' + id + ".png").put(files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress.toFixed(1) + '% done');
            document.getElementById("uploadprogress").innerHTML = "Uploading" + progress.toFixed(1) + '%';
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            alert("Can't Save image. Try again");
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                document.getElementById("uploadprogress").innerHTML = "Uploaded";
                console.log('File available at', downloadURL);
                if (files.length == 0) {
                    AddFirestoreData(id, "./images/noimage.png");
                } else {
                    AddFirestoreData(id, downloadURL);
                }
            });
        }
    );
}


function AddFirestoreData(id, link) {

    db.collection("products")
        .doc(id)
        .set({
            id: id,
            image: link,
            name: document.getElementById("addname").value,
            price: document.getElementById("addprice").value,
            quantity: document.getElementById("addquantity").value,
            description: document.getElementById("adddescription").value,
        })
        .then(() => {
            console.log("Document successfully written!");
            window.alert("Successfully Added " + document.getElementById("addname").value);
            clearAddUi();
            getFirestoreProducts();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function clearAddUi() {
    files = [];
    document.getElementById("addname").value = "";
    document.getElementById("addprice").value = "";
    document.getElementById("addquantity").value = "";
    document.getElementById("adddescription").value = "";
    document.getElementById("uploadprogress").innerHTML = "";
    document.getElementById("addimage").src = "./images/noimage.png";
}

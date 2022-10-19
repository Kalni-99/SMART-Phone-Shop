$("#login").submit(function (e) {
  e.preventDefault();
});

var username;
var password;

function initBasicData() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  var texts = [username, password];

  if (validate(texts)) {
    validateLogin(password, username);
  }
}

function validate(dataSet) {
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

function validateLogin(password, username) {
  var docRef = db.collection("admin").doc("login");

  docRef.get().then((doc) => {
    if (doc.exists) {
      if (username == doc.data().username) {
        if (password == doc.data().password) {
          console.log("correct");
          if (setCookie()) {
            clearUI();
            window.location.href = "home.html";
          }
        }
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

function setCookie() {
  var d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = "username" + "=" + username + ";" + expires + ";path=/";
  return true;
}

function clearUI() {
  document.getElementById("username").value = null;
  document.getElementById("password").value = null;
}

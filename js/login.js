
"use strict";

// Remove username from sessionStorage
sessionStorage.removeItem("username");

// Get elements from the DOM
let openModalBtn = document.getElementById("openModalBtn");
let closeModalBtn = document.getElementById("closeModalBtn");
let modal = document.getElementById("myModal");
let passwordCamp = document.getElementById("password");
let passwordCampRegister = document.getElementById("passwordRegister");
let checkMostrarPass = document.getElementById("mostrar");
let checkMostrarPassRegister = document.getElementById("mostrarRegister");

// Event listeners
openModalBtn.addEventListener("click", function () {
 modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function () {
 modal.style.display = "none";
});

checkMostrarPass.addEventListener("click", function () {
 passwordCamp.type = passwordCamp.type === "password" ? "text" : "password";
});

checkMostrarPassRegister.addEventListener("click", function () {
 passwordCampRegister.type =
    passwordCampRegister.type === "password" ? "text" : "password";
});

window.addEventListener("click", function (event) {
 if (event.target == modal) {
    modal.style.display = "none";
 }
});

// Functions

function sendForm() {
 let username = document.getElementById("username").value;
 let password = document.getElementById("password").value;

 console.log(username);
 console.log(password);

 fetch("https://pablo-data-games.glitch.me/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
 })
    .then((response) => response.json())
    .then((users) => {
      console.log(users);
      let userOk = users.find((user) => user.username === username);
      let passwordOk = users.find((user) => user.password === password);
      if (userOk && passwordOk) {
        users.find((user) => sessionStorage.setItem("username", user.username));
        console.log("Logged Ok");
        return (window.location.href = "../simon_says/web/simon.html");
      } else {
        return console.log("Username or Password Incorrect");
      }
    })
    .catch((error) => {
      console.error("Error al guardar les dades", error);
    });
}

function sendRegisterForm() {
 let username = document.getElementById("usernameRegister").value;
 let password = document.getElementById("passwordRegister").value;

 const newUser = {
    id: generarTokenCutre(),
    username: username,
    password: password,
 };

 fetch("https://pablo-data-games.glitch.me/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
 })
    .then((response) => response.json())
    .then((json) => {
      console.log("Usuari creat amb èxit", json);
    })
    .catch((error) => {
      console.error("Error al guardar les dades", error);
    });
}

function generarTokenCutre() {
 return Math.random().toString(36).substring(2);
}
//
//In this code, we have a login and registration system. The login system checks if the username and password match any existing user in the database. If they do, the user is logged in and redirected to the game page. The registration system creates a new user with the provided username and password and stores it in the database..</s>
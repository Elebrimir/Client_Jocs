"use strict";

sessionStorage.removeItem("username");

let openModalBtn = document.getElementById("openModalBtn");
let closeModalBtn = document.getElementById("closeModalBtn");
let modal = document.getElementById("myModal");
let passwordCamp = document.getElementById("password");
let passwordCampRegister = document.getElementById("passwordRegister");
let checkMostrarPass = document.getElementById("mostrar");
let checkMostrarPassRegister = document.getElementById("mostrarRegister");

// Eventos
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

//Funciones

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

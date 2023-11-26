"use strict";

function logout() {
  sessionStorage.removeItem("username");
  console.log("Sessió borrada");
  window.location.href = "../web/login.html";
}

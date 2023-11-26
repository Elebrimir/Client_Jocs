"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let loginOk = sessionStorage.getItem("username");

  if (!loginOk) {
    window.location.href = "../web/login.html";
  }
});

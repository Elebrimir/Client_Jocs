"use strict";

const botoInici = document.getElementById("botoInici");
const roig = document.getElementById("roig");
const groc = document.getElementById("groc");
const verd = document.getElementById("verd");
const blau = document.getElementById("blau");
const taronja = document.getElementById("taronja");
const morat = document.getElementById("morat");
const blanc = document.getElementById("blanc");
const negre = document.getElementById("negre");

const mostrarNivell = document.getElementById("nivell");
const mostrarTextNivell = document.getElementsByClassName("nivell")[0];

const podium = document.getElementById("llistaPodium");

const colors = { roig, groc, verd, blau, taronja, morat, negre, blanc };

let nomJugador = "";

let sequencia = [];
let nivell = -1;
let nivellActual = 0;

const ultim = 25;
const espera1 = 750;
const espera10 = 500;
const esperaMitja = 1500;
const eliminarColor = 350;
const colors1 = 4;
const colors15 = 6;
const colors20 = 8;

roig.setAttribute("hidden", "true");
groc.setAttribute("hidden", "true");
verd.setAttribute("hidden", "true");
blau.setAttribute("hidden", "true");
taronja.setAttribute("hidden", "true");
morat.setAttribute("hidden", "true");
blanc.setAttribute("hidden", "true");
negre.setAttribute("hidden", "true");

mostrarTextNivell.setAttribute("hidden", "true");

mostrarResultats();

function iniciarJoc() {
  console.log("iniciar Joc");

  mostrarTextNivell.removeAttribute("hidden");
  roig.removeAttribute("hidden");
  groc.removeAttribute("hidden");
  verd.removeAttribute("hidden");
  blau.removeAttribute("hidden");

  sequencia = new Array(ultim);
  sequencia = sequencia.fill(0);

  for (let i = 0; i < 15; i++) {
    sequencia[i] = Math.floor(Math.random() * colors1) + 1;
  }
  for (let i = 15; i < 20; i++) {
    sequencia[i] = Math.floor(Math.random() * colors15) + 1;
  }
  for (let i = 20; i < ultim; i++) {
    sequencia[i] = Math.floor(Math.random() * colors20) + 1;
  }

  nivell = 0;
  nivellActual = 0;

  botoInici.setAttribute("hidden", "true");

  mostrarNivell.textContent = nivell + 1;

  iluminarSequencia();
}

function iluminarSequencia() {
  //console.log("Iluminar Sequencia");

  for (let i = 0; i <= nivell; i++) {
    desactivarEventos();

    const color = transformarNrAColor(sequencia[i]);
    mostrarNivell.textContent = nivell + 1;
    console.log(color);
    if (nivell < 9) {
      setTimeout(() => iluminarColor(color), espera1 * i);
      setTimeout(() => activarEventos(), espera1 * nivell);
    } else if (nivell >= 9 && nivell < 14) {
      setTimeout(() => iluminarColor(color), espera10 * i);
      setTimeout(() => activarEventos(), espera10 * nivell);
    } else if (nivell >= 14 && nivell < 19) {
      taronja.removeAttribute("hidden");
      morat.removeAttribute("hidden");
      setTimeout(() => iluminarColor(color), espera10 * i);
      setTimeout(() => activarEventos(), espera10 * nivell);
    } else if (nivell >= 19 && nivell < ultim) {
      negre.removeAttribute("hidden");
      blanc.removeAttribute("hidden");
      setTimeout(() => iluminarColor(color), espera10 * i);
      setTimeout(() => activarEventos(), espera10 * nivell);
    }
  }
}

function iluminarColor(color) {
  //console.log("Iluminar Color");
  colors[color].classList.add("light");
  setTimeout(() => apagarColor(color), eliminarColor);
}

function apagarColor(color) {
  //console.log("apagar Color");
  colors[color].removeAttribute("class");
}

function triarColor(ev) {
  console.log("Triar Color");
  if (nivell === -1) return;

  const nomColor = ev.target.dataset.color;
  //console.log(nomColor);
  const nombreColor = transformarColorANr(nomColor);
  iluminarColor(nomColor);

  if (nombreColor === sequencia[nivellActual]) {
    nivellActual++;
    if (nivellActual > nivell) {
      nivell++;
      if (nivell === ultim) {
        nomJugador = prompt("Ingresa el teu nom:");
        setTimeout(() => alert("Has guanyat"), esperaMitja);
        anotarPuntuacio(nivell, nomJugador);
        acabarJoc();
      } else {
        nivellActual = 0;
        setTimeout(iluminarSequencia, esperaMitja);
      }
    }
  } else {
    colors[nomColor].classList.add("error");
    setTimeout(() => apagarColor(nomColor), eliminarColor);
    nomJugador = prompt("Ingresa el teu nom:");
    setTimeout(() => alert("Has perdut"), esperaMitja);
    anotarPuntuacio(nivell, nomJugador);
    acabarJoc();
  }
}

function acabarJoc() {
  //console.log("Acabar Joc");
  botoInici.removeAttribute("hidden");
  nivell = -1;
}

function transformarNrAColor(nombre) {
  //console.log("Transformar Nr a Color");
  switch (nombre) {
    case 1:
      return "roig";
    case 2:
      return "groc";
    case 3:
      return "verd";
    case 4:
      return "blau";
    case 5:
      return "taronja";
    case 6:
      return "morat";
    case 7:
      return "negre";
    case 8:
      return "blanc";
  }
}

function transformarColorANr(nombre) {
  //console.log("Transformar Color a Nr");
  switch (nombre) {
    case "roig":
      return 1;
    case "groc":
      return 2;
    case "verd":
      return 3;
    case "blau":
      return 4;
    case "taronja":
      return 5;
    case "morat":
      return 6;
    case "negre":
      return 7;
    case "blanc":
      return 8;
  }
}

function activarEventos() {
  //console.log("Activar eventos");
  colors.roig.addEventListener("click", triarColor);
  colors.groc.addEventListener("click", triarColor);
  colors.verd.addEventListener("click", triarColor);
  colors.blau.addEventListener("click", triarColor);
  colors.taronja.addEventListener("click", triarColor);
  colors.morat.addEventListener("click", triarColor);
  colors.negre.addEventListener("click", triarColor);
  colors.blanc.addEventListener("click", triarColor);
}

function desactivarEventos() {
  //console.log("Desactivar Eventos");
  colors.roig.removeEventListener("click", triarColor);
  colors.groc.removeEventListener("click", triarColor);
  colors.verd.removeEventListener("click", triarColor);
  colors.blau.removeEventListener("click", triarColor);
  colors.taronja.removeEventListener("click", triarColor);
  colors.morat.removeEventListener("click", triarColor);
  colors.negre.removeEventListener("click", triarColor);
  colors.blanc.removeEventListener("click", triarColor);
}

function generarTokenCutre() {
  return Math.random().toString(36).substring(2);
}

function obtindrePuntuació(nivell) {
  let puntuacio = 0;

  if (nivell >= 0 && nivell <= 9) {
    puntuacio += 5 * nivell;
  } else if (nivell >= 10 && nivell <= 14) {
    puntuacio += 10 * nivell;
  } else if (nivell >= 15 && nivell <= 19) {
    puntuacio += 15 * nivell;
  } else if (nivell >= 20 && nivell <= 24) {
    puntuacio += 20 * nivell;
  } else {
    puntuacio += 0;
  }

  console.log(puntuacio);
  return puntuacio;
}

function anotarPuntuacio(nivell, nomJugador) {
  const infoPartida = {
    id: generarTokenCutre(),
    jugador: nomJugador,
    puntuacio: obtindrePuntuació(nivell),
    maxNivell: nivell,
  };

  console.log(infoPartida);

  fetch("https://pablo-data-games.glitch.me/games", {
    method: "POST",
    body: JSON.stringify(infoPartida),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error("Error al guardar les dades", error);
    });
}

function mostrarResultats() {
  fetch("https://pablo-data-games.glitch.me/games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((historicJugadors) => {
      console.log(historicJugadors);

      historicJugadors.sort((a, b) => {
        return b.puntuacio - a.puntuacio;
      });

      podium.innerHTML += `
      <h1>Podium Puntuacions<h1>
      <h2><li>${historicJugadors[0].jugador} -  ${historicJugadors[0].puntuacio} punts</li></h2>
      <h3><li>${historicJugadors[1].jugador} -  ${historicJugadors[1].puntuacio} punts</li></h3>
      <h4><li>${historicJugadors[2].jugador} -  ${historicJugadors[2].puntuacio} punts</li></h4>
      <hr>
      <h5><li>${historicJugadors[3].jugador} -  ${historicJugadors[3].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      <h5><li>${historicJugadors[4].jugador} -  ${historicJugadors[4].puntuacio} punts</li></h5>
      `;
    })
    .catch((error) => {
      console.error("Error al obtindre les dades", error);
    });
}

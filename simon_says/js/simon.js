"use strict";

const botoInici = document.getElementById("iniciarJoc");
const negre = document.getElementById("negre");
const roig = document.getElementById("roig");
const taronja = document.getElementById("taronja");
const groc = document.getElementById("groc");
const verd = document.getElementById("verd");
const morat = document.getElementById("morat");
const blau = document.getElementById("blau");
const blanc = document.getElementById("blanc");
const mostrarNivell = document.getElementById("nivell");

const colors = { roig, groc, verd, blau, taronja, morat, negre, blanc };

/*colors.roig.addEventListener("click", triarColor);
colors.groc.addEventListener("click", triarColor);
colors.verd.addEventListener("click", triarColor);
colors.blau.addEventListener("click", triarColor);
colors.taronja.addEventListener("click", triarColor);
colors.morat.addEventListener("click", triarColor);
colors.negre.addEventListener("click", triarColor);
colors.blanc.addEventListener("click", triarColor);*/

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

function iniciarJoc() {
  console.log("iniciar Joc");
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

  botoInici.setAttribute("hidden", "");
  negre.setAttribute("hidden", "");
  taronja.setAttribute("hidden", "");
  morat.setAttribute("hidden", "");
  blanc.setAttribute("hidden", "");

  mostrarNivell.textContent = nivell + 1;

  iluminarSequencia();
}

function iluminarSequencia() {
  console.log("Iluminar Sequencia");

  for (let i = 0; i <= nivell; i++) {
    desactivarEventos();
    const color = transformarNrAColor(sequencia[i]);
    mostrarNivell.textContent = nivell + 1;
    setTimeout(() => iluminarColor(color), espera1 * i);
  }
  setTimeout(() => activarEventos(), espera1 * nivell);
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
  console.log(nomColor);
  const nombreColor = transformarColorANr(nomColor);
  iluminarColor(nomColor);

  if (nombreColor === sequencia[nivellActual]) {
    nivellActual++;
    if (nivellActual > nivell) {
      nivell++;
      if (nivell === ultim) {
        alert("Has guanyat");

        acabarJoc();
      } else {
        nivellActual = 0;
        setTimeout(iluminarSequencia, esperaMitja);
      }
    }
  } else {
    alert("Has perdut");
    acabarJoc();
  }
}

function acabarJoc() {
  console.log("Acabar Joc");
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
  console.log("Activar eventos");
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
  console.log("Desactivar Eventos");
  colors.roig.removeEventListener("click", triarColor);
  colors.groc.removeEventListener("click", triarColor);
  colors.verd.removeEventListener("click", triarColor);
  colors.blau.removeEventListener("click", triarColor);
  colors.taronja.removeEventListener("click", triarColor);
  colors.morat.removeEventListener("click", triarColor);
  colors.negre.removeEventListener("click", triarColor);
  colors.blanc.removeEventListener("click", triarColor);
}

"use strict";

// Definir les variables
let Partida = [];

let Jugador = [
  { id: 1, nom: "", caselles: [], jocs: 0, partides: 0 },
  { id: 2, nom: "", caselles: [], jocs: 0, partides: 0 },
];

const anuncis = document.getElementById("marc_anuncis");
const resultats = document.getElementById("partidesJugades");
const inputJugador1 = document.getElementById("Jugador1");
const inputJugador2 = document.getElementById("Jugador2");

let jugadorActual = Jugador[0].id; // 1 Per al jugador 1, 2 per al jugador 2
let PartidaActual;
let tablero = new Array(9).fill(null);

let combinacionsGuanyadores = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Funció iniciar Partida

function iniciarJoc(jugadors) {
  tablero = new Array(9).fill(null);
  console.log("iniciar Joc");

  const partiSelect = document.getElementById("nombrePartides");

  let jugadorsGuardatsJSON = localStorage.getItem("jugadorsGuardats");
  let partidesGuardadesJSON = localStorage.getItem("partidesGuardades");

  if (!partidesGuardadesJSON == null) {
    Partida = JSON.parse(partidesGuardadesJSON);
    console.log("Carrega Partides");
  }

  if (!jugadorsGuardatsJSON == null) {
    Jugador = JSON.parse(jugadorsGuardatsJSON);
    console.log("Carrega Jugadors");
  }

  Partida.push({ id: Partida.length, CantitadJocs: 0, JocsRealitzats: 0 });
  PartidaActual = Partida.length - 1;

  Partida[PartidaActual].CantitadJocs = parseInt(partiSelect.value);

  console.log(PartidaActual);
  console.log(Partida);

  // Configurar joc per a 1 o 2 jugadors
  if (jugadors === 1) {
    anuncis.textContent = `Introduïu el nom del Jugador`;

    inputJugador1.removeAttribute("disabled");

    setTimeout(() => {
      inputJugador1.setAttribute("disabled", true);

      Jugador[0].nom = inputJugador1.value;
      Jugador[1].nom = "Ordinador";

      single_player.iniciar();
    }, 5000);
  } else if (jugadors === 2) {
    anuncis.textContent = `Introduïu els noms dels Jugadors`;

    inputJugador1.removeAttribute("disabled");
    inputJugador2.removeAttribute("disabled");

    setTimeout(() => {
      inputJugador1.setAttribute("disabled", true);
      inputJugador2.setAttribute("disabled", true);

      Jugador[0].nom = inputJugador1.value;
      Jugador[1].nom = inputJugador2.value;

      multi_players.iniciar();
    }, 8000);
  }
}

//Funció per a acabar la partida
function finalPartida() {
  console.log("Final Partida");
  Partida[PartidaActual].JocsRealitzats += 1;

  anuncis.textContent = `Puntuació: ${Jugador[0].jocs} vs ${Jugador[1].jocs}`;

  if (
    Partida[PartidaActual].JocsRealitzats < Partida[PartidaActual].CantitadJocs
  ) {
    setTimeout(() => {
      reiniciarJoc();
    }, 4000);

    return false;
  } else {
    Jugador[0].jocs > Jugador[1].jocs
      ? (anuncis.textContent = `${Jugador[0].nom} ha guanyat`)
      : (anuncis.textContent = `${Jugador[1].nom} ha guanyat`);
    localStorage.setItem("jugadorsGuardats", JSON.stringify(Jugador));
    localStorage.setItem("partidesGuardades", JSON.stringify(Partida));
    return true;
  }
}

// Funció per a reiniciar el joc
function reiniciarJoc() {
  console.log("Reiniciar Joc");
  tablero = new Array(9).fill(null);
  Jugador[0].caselles = new Array();
  Jugador[1].caselles = new Array();
  for (let i = 1; i <= 9; i++) {
    const casiller = document.getElementById(`casella-${i}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = "";
  }
  anuncis.textContent = `Partida ${Partida[PartidaActual].JocsRealitzats} de ${Partida[PartidaActual].CantitadJocs}`;
}

//Funció fer moviment
function ferMoviment(casella) {
  console.log("Fer Moviment");
  if (tablero[casella - 1] === null) {
    tablero[casella - 1] = jugadorActual === 1 ? "X" : "O";

    const casiller = document.getElementById(`casella-${casella}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = tablero[casella - 1];

    jugadorActual === 1
      ? Jugador[0].caselles.push(casella)
      : Jugador[1].caselles.push(casella);
    return;
  } else {
    anuncis.textContent = "Casiller ocupat. Tria'n un altre";
  }
}

function ferMovimentIA() {
  console.log("Moviment IA");
  let boto;
  let casellaIA;
  let casellaOk = false;

  do {
    casellaIA = getRandomIntInclusive(1, 9);
    console.log(casellaIA);
    console.log(tablero);
    if (tablero[casellaIA - 1] === null) {
      tablero[casellaIA - 1] = "O";
      const casiller = document.getElementById(`casella-${casellaIA}`);
      const contingut = casiller.querySelector("p");
      contingut.textContent = "O";

      Jugador[1].caselles.push(casellaIA);
      casellaOk = true;
    }
  } while (!casellaOk);
  return;
}

//Funció Verificar guanyador
function verificarGuanyador() {
  console.log("Verificar guanyador");
  let guanya = false;

  for (let i = 0; i < combinacionsGuanyadores.length; i++) {
    let combGuanya = combinacionsGuanyadores[i];

    if (jugadorActual === 1) {
      guanya = combGuanya.every((valor) => Jugador[0].caselles.includes(valor));
    } else {
      guanya = combGuanya.every((valor) => Jugador[1].caselles.includes(valor));
    }

    if (guanya) {
      setTimeout(() => {
        anuncis.textContent = `Jugador: ${
          Jugador[jugadorActual - 1].nom
        } guanya`;
      }, 3000);
      anotarPartida();
      return true;
    }
  }
  return false;
}

function anotarPartida() {
  console.log("Anotar partida");
  if (jugadorActual === 1) {
    Jugador[0].jocs += 1;
    resultats.textContent += `${Jugador[0].nom} ${Jugador[0].jocs} - ${Jugador[1].jocs} ${Jugador[1].nom}\n-Moviments utilitzats ${Jugador[0].caselles}\n`;
  } else {
    Jugador[1].jocs += 1;
    resultats.textContent += `${Jugador[1].nom} ${Jugador[1].jocs} - ${Jugador[0].jocs} ${Jugador[0].nom}\n-Moviments utilitzats ${Jugador[1].caselles}\n`;
  }
}

// Funció per a cambiar el torn després de cada moviment
function canviarTorn() {
  console.log("Canviar Torn");
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  anuncis.textContent = `Torn Jugador ${Jugador[jugadorActual - 1].nom}`;
}

// Funció per a seleccionar casella aleatoria

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

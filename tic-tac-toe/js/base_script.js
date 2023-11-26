"use strict";

// Definir les variables
let Partida = { id: generarTokenCutre(), cantitadJocs: 0, jocsRealitzats: 0 };

let Jugador = [
  { id: 1, nom: "", caselles: [], jocs: 0, partides: 0 },
  { id: 2, nom: "", caselles: [], jocs: 0, partides: 0 },
];

const anuncis = document.getElementById("marc_anuncis");
const resultats = document.getElementById("partidesJugades");
const inputJugador1 = document.getElementById("Jugador1");
const inputJugador2 = document.getElementById("Jugador2");
let info1Partida;
let info2Partida;

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

Jugador[0].nom = sessionStorage.getItem("username");
inputJugador1.value = Jugador[0].nom;
// Funció iniciar Partida

function iniciarJoc(jugadors) {
  tablero = new Array(9).fill(null);
  console.log("iniciar Joc");

  const partiSelect = document.getElementById("nombrePartides");

  PartidaActual = Partida.id;
  Partida.cantitadJocs = parseInt(partiSelect.value);

  console.log(PartidaActual);
  console.log(Partida);

  // Configurar joc per a 1 o 2 jugadors
  if (jugadors === 1) {
    anuncis.textContent = `${Jugador[0].nom}, preparat per a jugar?`;

    setTimeout(() => {
      Jugador[1].nom = "Ordinador";
      inputJugador2.value = Jugador[1].nom;

      single_player.iniciar();
    }, 2000);
  } else if (jugadors === 2) {
    anuncis.textContent = `${Jugador[0].nom}, Introduïu el nom del vostre rival`;

    inputJugador2.removeAttribute("disabled");

    setTimeout(() => {
      inputJugador2.setAttribute("disabled", true);

      Jugador[1].nom = inputJugador2.value;

      multi_players.iniciar();
    }, 8000);
  }
}

//Funció per a acabar la partida
function finalPartida() {
  console.log("Final Partida");
  Partida.jocsRealitzats += 1;

  anuncis.textContent = `Puntuació: ${Jugador[0].jocs} vs ${Jugador[1].jocs}`;

  if (Partida.jocsRealitzats < Partida.cantitadJocs) {
    setTimeout(() => {
      reiniciarJoc();
    }, 4000);

    return false;
  } else {
    Jugador[0].jocs > Jugador[1].jocs
      ? (anuncis.textContent = `${Jugador[0].nom} ha guanyat`)
      : (anuncis.textContent = `${Jugador[1].nom} ha guanyat`);

    // Falta fer el fetch al Json-server y enviar el resultat de la partida
    if (Jugador[0].jocs > Jugador[1].jocs) {
      info1Partida = {
        id: Partida.id,
        jugador: Jugador[0].nom,
        puntuacio: Jugador[0].jocs,
        joc: "Tic-Tac-Toe",
        resultat: "Victoria",
        rival: Jugador[1].nom,
      };
      info2Partida = {
        id: Partida.id,
        jugador: Jugador[1].nom,
        puntuacio: Jugador[1].jocs,
        joc: "Tic-Tac-Toe",
        resultat: "Derrota",
        rival: Jugador[0].nom,
      };
    } else {
    }
    info1Partida = {
      id: Partida.id,
      jugador: Jugador[1].nom,
      puntuacio: Jugador[1].jocs,
      joc: "Tic-Tac-Toe",
      resultat: "Victoria",
      rival: Jugador[0].nom,
    };
    info2Partida = {
      id: generarTokenCutre(),
      jugador: Jugador[0].nom,
      puntuacio: Jugador[0].jocs,
      joc: "Tic-Tac-Toe",
      resultat: "Derrota",
      rival: Jugador[1].nom,
    };

    console.log(info1Partida);
    console.log(info2Partida);

    fetch("https://pablo-data-games.glitch.me/games", {
      method: "POST",
      body: JSON.stringify(info1Partida),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Dades 1 guardades amb exit", json);
      })
      .catch((error) => {
        console.error("Error al guardar les dades", error);
      });

    fetch("https://pablo-data-games.glitch.me/games", {
      method: "POST",
      body: JSON.stringify(info2Partida),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Dades 2 guardades amb exit", json);
      })
      .catch((error) => {
        console.error("Error al guardar les dades", error);
      });

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
  anuncis.textContent = `Partida ${Partida.jocsRealitzats} de ${Partida.cantitadJocs}`;
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

function generarTokenCutre() {
  return Math.random().toString(36).substring(2);
}

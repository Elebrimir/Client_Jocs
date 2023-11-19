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

  const partiSelect = document.getElementById("nombrePartides");

  Partida.push({ id: Partida.length, CantitadJocs: 0, JocsRealitzats: 0 });
  PartidaActual = Partida.length - 1;

  Partida[PartidaActual].CantitadJocs = parseInt(partiSelect.value);

  console.log(PartidaActual);
  console.log(Partida);

  // Configurar joc per a 1 o 2 jugadors
  if (jugadors === 1) {
    //single_player.iniciar();
  } else if (jugadors === 2) {
    anuncis.textContent = `Introduiu el nom dels Jugadors`;

    inputJugador1.removeAttribute("disabled");
    inputJugador2.removeAttribute("disabled");

    setTimeout(() => {
      inputJugador1.setAttribute("disabled", true);
      inputJugador2.setAttribute("disabled", true);

      Jugador[0].nom = inputJugador1.value;
      Jugador[1].nom = inputJugador2.value;

      multi_players.iniciar();
    }, 5000);
  }
}

//Funció per a acabar la partida
function finalPartida() {
  Partida[PartidaActual].JocsRealitzats += 1;

  anuncis.textContent = `Puntuació: ${Jugador[0].partides} vs ${Jugador[1].partides}`;

  if (
    Partida[PartidaActual].JocsRealitzats < Partida[PartidaActual].CantitadJocs
  ) {
    reiniciarJoc();
    return false;
  } else {
    Jugador[0].partides > Jugador[1].partides
      ? (anuncis.textContent = `${Jugador[0].nom} ha guanyat`)
      : (anuncis.textContent = `${Jugador[1].nom} ha guanyat`);
    localStorage.setItem("jugadorsGuardats", JSON.stringify(Jugador));
    return true;
  }
}

// Funció per a reiniciar el joc
function reiniciarJoc() {
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
  if (tablero[casella - 1] === null) {
    tablero[casella - 1] = jugadorActual === 1 ? "X" : "O";

    const casiller = document.getElementById(`casella-${casella}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = tablero[casella - 1];

    jugadorActual === 1
      ? Jugador[0].caselles.push(casella)
      : Jugador[1].caselles.push(casella);
  } else {
    anuncis.textContent = "Casiller ocupat. Tria'n un altre";
  }
}

//Funció Verificar guanyador
function verificarGuanyador() {
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
  if (jugadorActual === 1) {
    Jugador[0].partides += 1;
    resultats.textContent += `${Jugador[0].nom} ${Jugador[0].partides} - ${Jugador[1].partides} ${Jugador[1].nom}\n-Moviments utilitzats ${Jugador[0].caselles}\n`;
  } else {
    Jugador[1].partides += 1;
    resultats.textContent += `${Jugador[1].nom} ${Jugador[1].partides} - ${Jugador[0].partides} ${Jugador[0].nom}\n-Moviments utilitzats ${Jugador[1].caselles}\n`;
  }
}

// Funció per a cambiar el torn després de cada moviment
function cambiarTorn() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  anuncis.textContent = `Torn Jugador ${Jugador[jugadorActual - 1].nom}`;
}

// Funció per a reiniciar les variables

function iniciarVariables() {
  Partida = [{ id: 0, CantitadJocs: 0, JocsRealitzats: 0 }];
  Jugador = [
    { id: 1, nom: "", caselles: [], partides: 0 },
    { id: 2, nom: "", caselles: [], partides: 0 },
  ];
  jugadorActual = Jugador[0].id;
  PartidaActual = Partida[0].id;
  tablero = new Array(9).fill(null);
}

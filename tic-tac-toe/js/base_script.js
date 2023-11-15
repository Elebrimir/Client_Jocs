"use strict";

// Definir les variables
const Partida = { CantitadJocs: 0, JocsRealitzats: 0 };
const Jugador1 = { id: 1, nom: "", caselles: [], partides: 0 };
const Jugador2 = { id: 2, nom: "", caselles: [], partides: 0 };

let jugadorActual = Jugador1.id; // 1 Per al jugador 1, 2 per al jugador 2

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
  const partiSelect = document.getElementById("nombrePartides");
  Partida.CantitadJocs = parseInt(partiSelect.value);

  // Configurar joc per a 1 o 2 jugadors
  if (jugadors === 1) {
    //single_player.iniciar();
  } else if (jugadors === 2) {
    multi_players.iniciar();
  }
}

//Funció per a acabar la partida
function finalPartida() {
  Partida.JocsRealitzats += 1;

  alert(
    `Puntuació: Jugador1: ${Jugador1.partides} vs Jugador2: ${Jugador2.partides}`
  );

  if (Partida.JocsRealitzats < Partida.CantitadJocs) {
    reiniciarJoc();
  } else {
    Jugador1.partides > Jugador2.partides
      ? alert("El jugador 1 ha guanyat")
      : alert("El Jugador 2 ha guanyat");
  }
}

// Funció per a reiniciar el joc
function reiniciarJoc() {
  tablero = new Array(9).fill(null);
  Jugador1.caselles = new Array();
  Jugador2.caselles = new Array();
  for (let i = 1; i <= 9; i++) {
    const casiller = document.getElementById(`casella-${i}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = "";
  }
  alert(`Partida ${Partida.JocsRealitzats} de ${Partida.CantitadJocs}`);
}

//Funció fer moviment
function ferMoviment(casella) {
  if (tablero[casella - 1] === null) {
    tablero[casella - 1] = jugadorActual === 1 ? "X" : "O";

    const casiller = document.getElementById(`casella-${casella}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = tablero[casella - 1];

    jugadorActual === 1
      ? Jugador1.caselles.push(casella)
      : Jugador2.caselles.push(casella);
  } else {
    alert("Casiller ocupat. Tria'n un altre");
  }
}

//Funció Verificar guanyador
function verificarGuanyador() {
  let guanya = false;

  for (let i = 0; i < combinacionsGuanyadores.length; i++) {
    let combGuanya = combinacionsGuanyadores[i];

    if (jugadorActual === 1) {
      guanya = combGuanya.every((valor) => Jugador1.caselles.includes(valor));
    } else {
      guanya = combGuanya.every((valor) => Jugador2.caselles.includes(valor));
    }

    if (guanya) {
      alert(`Jugador ${jugadorActual} ha guanyat`);
      anotarPartida();
      return true;
    }
  }
  return false;
}

function anotarPartida() {
  if (jugadorActual === 1) {
    Jugador1.partides += 1;
  } else {
    Jugador2.partides += 1;
  }
}

// Funció per a cambiar el torn després de cada moviment
function cambiarTorn() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  console.log(`Torn del Jugador ${jugadorActual}`);
}

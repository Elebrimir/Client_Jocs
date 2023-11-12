"use strict";

// Definir les variables
let cantitatPartides = 3;
let cantitatPartidesFetes = 0;
let jugadorActual = 1; // 1 Per al jugador 1, 2 per al jugador 2
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

function iniciarJoc(jugadors) {
  const partidesSeleccionades = document.getElementById("nombrePartides");
  cantitatPartides = parseInt(partidesSeleccionades.value);

  // Configurar joc per a 1 o 2 jugadors
  if (jugadors === 1) {
    //single_player.iniciar();
  } else if (jugadors === 2) {
    multi_players.iniciar();
  }
}

//Funció per a acabar la partida
function finalPartida() {
  cantitatPartidesFetes++;

  if (cantitatPartidesFetes <= cantitatPartides) {
    reiniciarJoc();
  } else {
    alert("Final del Joc!! S'ha alcançat el nombre màxim de partides");
  }
}

// Funció per a reiniciar el joc
function reiniciarJoc() {
  tablero = new Array(9).fill(null);
  for (let i = 1; i <= 9; i++) {
    const casiller = document.getElementById(`casella-${i}`);
    const contingut = casiller.querySelector("p");
    contingut.textContent = "";
  }
  alert(`Partida ${cantitatPartidesFetes} de ${cantitatPartides}`);
}

//Funció fer moviment
function ferMoviment(casella) {
  if (tablero[casella - 1] === null) {
    tablero[casella - 1] = jugadorActual === 1 ? "X" : "O";

    console.log(casella);

    const casiller = document.getElementById(`casella-${casella}`);
    console.log(casiller);
    const contingut = casiller.querySelector("p");
    contingut.textContent = tablero[casella - 1];

    if (verificarGuanyador()) {
      alert(`Jugador ${jugadorActual} ha guanyat`);
      finalPartida();
    } else {
      cambiarTorn();
    }
  } else {
    alert("Casiller ocupat. Tria un altre");
  }
}

//Funció Verificar guanyador
function verificarGuanyador() {}

// Funció per a cambiar el torn després de cada moviment
function cambiarTorn() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  console.log(`Torn del Jugador ${jugadorActual}`);
}

iniciarJoc(1);

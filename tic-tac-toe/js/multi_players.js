"use strict";
let guanyadorJoc = false;
let guanyadorPartida = false;

if (typeof multi_players === "undefined") {
  var multi_players = {};
}

multi_players.iniciar = function () {
  for (let i = 1; i <= 9; i++) {
    const casiller = document.getElementById(`casella-${i}`);
    casiller.addEventListener("click", function () {
      anuncis.textContent = "";

      ferMoviment(i);

      guanyadorJoc = verificarGuanyador();

      guanyadorJoc ? (guanyadorPartida = finalPartida()) : canviarTorn();

      if (guanyadorPartida) {
        multi_players.desvincularEventListeners();
        reiniciarJoc();
        setTimeout(() => {
          location.reload();
        }, 8000);
      }
    });
  }
};

multi_players.desvincularEventListeners = function () {
  for (let j = 1; j <= 9; j++) {
    const casiller = document.getElementById(`casella-${j}`);
    casiller.removeEventListener("click", multi_players.manejarClic);
  }
};

"use strict";

const single_player = {
  iniciar: function () {
    for (let i = 1; i <= 9; i++) {
      const casiller = document.getElementById(`casella-${i}`);
      casiller.addEventListener("click", function () {
        anuncis.textContent = "";

        if (jugadorActual === 1) {
          ferMoviment(i);
        } else {
          ferMovimentIA();
        }

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
  },
};

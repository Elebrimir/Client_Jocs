"use strict";

const multi_players = {
  iniciar: function () {
    for (let i = 1; i <= 9; i++) {
      const casiller = document.getElementById(`casella-${i}`);
      casiller.addEventListener("click", function () {
        ferMoviment(i);
      });
    }
    
  },
};

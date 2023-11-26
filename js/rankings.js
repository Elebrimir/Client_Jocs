"use strict";

let users = [];
let jocs = [];
let usersGames = {};
let nomJoc = {};

const gamesDiv = document.getElementById("Games");
const rankPlayers = document.getElementById("rank-players");
const rankGames = document.getElementById("rank-games");

fetch("https://pablo-data-games.glitch.me/games", {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error de red o servidor");
    }
    return response.json();
  })
  .then((games) => {
    // Sort game data based on score
    games.sort((a, b) => b.puntuacio - a.puntuacio);

    users = new Set(games.map((user) => user.jugador));

    users.forEach((nom) => {
      usersGames[nom] = games.filter((game) => game.jugador === nom);
    });

    for (const nom in usersGames) {
      if (usersGames.hasOwnProperty.call(usersGames, nom)) {
        const element = usersGames[nom];
        console.log(element);
        rankPlayers.innerHTML += `<img
        src="https://api.dicebear.com/7.x/bottts/svg?seed=${element[0].jugador}"
        console.log(seed);
        alt="avatar"
       /><h1>Ranking del Jugador ${element[0].jugador}</h1>`;

        for (let i = 0; i < element.length; i++) {
          console.log(element[i]);
          rankPlayers.innerHTML += `<div class="listGames"><li class="ranking" id="${
            element[i].id
          }">Partida ${[i + 1]} -&nbsp<em>Jugador: ${
            element[i].jugador
          }</em>&nbsp - ${element[i].puntuacio} Punts - Joc: ${element[i].joc}`;
        }
      }
    }

    jocs = new Set(games.map((game) => game.joc));

    jocs.forEach((joc) => {
      nomJoc[joc] = games.filter((game) => game.joc === joc);
    });

    for (const joc in nomJoc) {
      if (nomJoc.hasOwnProperty.call(nomJoc, joc)) {
        const element = nomJoc[joc];
        console.log(element);

        rankGames.innerHTML += `<h1>Ranking del Joc ${element[0].joc}</h1>`;

        for (let i = 0; i < element.length; i++) {
          console.log(element[i]);
          rankGames.innerHTML += `<div class="listGames"><li class="ranking" id="${
            element[i].id
          }">Partida ${[i + 1]} -&nbsp<em>Jugador: ${
            element[i].jugador
          }</em>&nbsp - ${element[i].puntuacio} Punts - Joc: ${element[i].joc}`;
        }
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

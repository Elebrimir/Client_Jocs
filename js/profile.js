"use strict";

// Retrieve username and userid from sessionStorage
let username = sessionStorage.getItem("username");
let userid = sessionStorage.getItem("id");

// Get HTML elements by their ID
const userRank = document.getElementById("GamesUser");
const avatar = document.getElementById("avatar");

// Fetch user data from the server
fetch("https://pablo-data-games.glitch.me/users", {
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
  .then((users) => {
    // Filter user data based on userid
    let userData = users.filter((user) => user.id === userid);

    // Get input elements by their ID
    let inputUsername = document.getElementById("name");
    let inputSurname = document.getElementById("surname");
    let inputEmail = document.getElementById("email");
    let inputPassword = document.getElementById("password");

    // Set input values with user data
    inputUsername.value = userData[0].username;
    inputSurname.value = userData[0].surname;
    inputEmail.value = userData[0].email;
    inputPassword.value = userData[0].password;
  })
  .catch((error) => {
    console.error(error);
  });

// Fetch game data from the server
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
    // Filter game data based on username
    let userGames = games.filter((game) => game.jugador === username);

    // Sort game data based on score
    userGames.sort((a, b) => b.puntuacio - a.puntuacio);

    // Create a list of games for the user
    for (let i = 0; i < userGames.length; i++) {
      userRank.innerHTML += `<div class="listGames"><li class="ranking" id="${
        userGames[i].id
      }">Partida ${[i + 1]} - <em>id: ${userGames[i].id}</em>&nbsp - ${
        userGames[i].puntuacio
      } Punts - Joc: ${
        userGames[i].joc
      }</li><button type="button" onclick="eraseGame(this)">Borrar</button></div>`;
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Function to delete a game from the list
function eraseGame(button) {
  let gameToErase = button.parentNode;
  let idGameToErase = gameToErase.querySelector(".ranking").id;

  console.log(idGameToErase);

  fetch(`https://pablo-data-games.glitch.me/games/${idGameToErase}`, {
    method: "DELETE",
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
    .then((gameErased) => {
      console.log(gameErased);
      alert("Joc eliminat correctament!");
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to delete all data
function eraseAllData() {
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
      let userGames = games.filter((game) => game.jugador === username);

      for (let i = 0; i < userGames.length; i++) {
        fetch(`https://pablo-data-games.glitch.me/games/${userGames[i].id}`, {
          method: "DELETE",
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
          .then((gameErased) => {
            console.log(gameErased);
            alert("Joc eliminat correctament!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  location.reload();
}

// Function to update the user's profile
function updateProfile() {
  let id = sessionStorage.getItem("id");

  const profilePatch = {};

  nameProfile = document.getElementById("name").value;
  surnameProfile = document.getElementById("surname").value;
  emailProfile = document.getElementById("email").value;
  passwordProfile = document.getElementById("password").value;

  profilePatch.username = nameProfile;
  profilePatch.surname = surnameProfile;
  profilePatch.email = emailProfile;
  profilePatch.password = passwordProfile;

  console.log(profilePatch);

  fetch(`https://pablo-data-games.glitch.me/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(profilePatch),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Dades actualitzades amb exit", json);
    })
    .catch((error) => {
      console.error("Error al actualitzar les dades", error);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Display the user's avatar
avatar.innerHTML = `<img
 src="https://api.dicebear.com/7.x/bottts/svg?seed=${username}"
 console.log(seed);
 alt="avatar"
/>`;
//
//This code has been updated with proper commenting to ensure clarity and conciseness. Comments have been added to explain the purpose of each section of code, making it easier to understand for your career.

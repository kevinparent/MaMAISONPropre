// Charger les membres depuis le localStorage s'ils existent
const membres = JSON.parse(localStorage.getItem("membres")) || [];

const formMembre = document.getElementById("formMembre");
const listeMembres = document.getElementById("listeMembres");

// afficher la liste au démarrage
afficherMembres();

formMembre.addEventListener("submit", function(event) {
  event.preventDefault();

  const prenom = document.getElementById("prenom").value;
  const age = parseInt(document.getElementById("age").value);
  const avatar = document.getElementById("avatar").value;

  membres.push({ prenom: prenom, age: age, avatar: avatar });

  // sauvegarder dans localStorage
  localStorage.setItem("membres", JSON.stringify(membres));

  afficherMembres();
  formMembre.reset();
});

function afficherMembres() {
  listeMembres.innerHTML = "";
  membres.forEach(function(membre) {
    listeMembres.innerHTML += `
      <li>
        <img src="${membre.avatar}" alt="avatar" width="50">
        ${membre.prenom} (âge : ${membre.age} ans)
      </li>
    `;
  });
}

// Charger les pièces depuis localStorage
const pieces = JSON.parse(localStorage.getItem("pieces")) || [];

const formPiece = document.getElementById("formPiece");
const listePieces = document.getElementById("listePieces");

// afficher les pièces au démarrage
afficherPieces();

formPiece.addEventListener("submit", function(event) {
  event.preventDefault();

  const nomPiece = document.getElementById("nomPiece").value;

  pieces.push(nomPiece);

  // sauvegarder dans localStorage
  localStorage.setItem("pieces", JSON.stringify(pieces));

  afficherPieces();
  formPiece.reset();
});

function afficherPieces() {
  listePieces.innerHTML = "";
  pieces.forEach(function(piece, index) {
    listePieces.innerHTML += `
      <li>
        ${piece}
        <button onclick="supprimerPiece(${index})">Supprimer</button>
      </li>
    `;
  });
}

function supprimerPiece(index) {
  pieces.splice(index, 1);
  localStorage.setItem("pieces", JSON.stringify(pieces));
  afficherPieces();
}
// Charger les tâches depuis localStorage
const taches = JSON.parse(localStorage.getItem("taches")) || [];

const formTache = document.getElementById("formTache");
const listeTaches = document.getElementById("listeTaches");
const pieceTache = document.getElementById("pieceTache");

// mettre à jour le menu déroulant des pièces
function mettreAJourSelectPieces() {
  pieceTache.innerHTML = "";
  pieces.forEach(function(piece) {
    pieceTache.innerHTML += `<option value="${piece}">${piece}</option>`;
  });
}

// appel au démarrage
mettreAJourSelectPieces();

// afficher les tâches au démarrage
afficherTaches();

formTache.addEventListener("submit", function(event) {
  event.preventDefault();

  const nomTache = document.getElementById("nomTache").value;
  const pieceChoisie = document.getElementById("pieceTache").value;

  taches.push({ nom: nomTache, piece: pieceChoisie });

  // sauvegarder dans localStorage
  localStorage.setItem("taches", JSON.stringify(taches));

  afficherTaches();
  formTache.reset();
});

function afficherTaches() {
  listeTaches.innerHTML = "";
  taches.forEach(function(tache, index) {
    listeTaches.innerHTML += `
      <li>
        ${tache.nom} (dans ${tache.piece})
        <button onclick="supprimerTache(${index})">Supprimer</button>
      </li>
    `;
  });
}

function supprimerTache(index) {
  taches.splice(index, 1);
  localStorage.setItem("taches", JSON.stringify(taches));
  afficherTaches();
}
const genererHoraireBtn = document.getElementById("genererHoraire");
const calendrierDiv = document.getElementById("calendrier");

genererHoraireBtn.addEventListener("click", function() {
  genererHoraire();
});

function genererHoraire() {
  calendrierDiv.innerHTML = ""; // on vide

  if (membres.length === 0 || taches.length === 0) {
    calendrierDiv.innerHTML = "<p>Ajoutez des membres et des tâches avant de générer l’horaire !</p>";
    return;
  }

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  // on prépare un calendrier vide
  let calendrier = {};
  jours.forEach(jour => calendrier[jour] = []);

  // distribuer les tâches de façon simple
  taches.forEach((tache, index) => {
    // choisir un membre aléatoire parmi ceux d’un âge suffisant
    let possibles = membres.filter(m => {
      if (m.age <= 6) return tache.nom.includes("ranger"); // exemple : petits peuvent ranger
      else return true; // les plus grands font tout
    });

    if (possibles.length === 0) possibles = membres; // au cas où

    const randomMembre = possibles[Math.floor(Math.random() * possibles.length)];
    const jour = jours[index % 7];

    calendrier[jour].push({
      tache: tache.nom,
      piece: tache.piece,
      membre: randomMembre.prenom
    });
  });

  // affichage
  jours.forEach(jour => {
    calendrierDiv.innerHTML += `<h4>${jour}</h4>`;
    if (calendrier[jour].length === 0) {
      calendrierDiv.innerHTML += "<p>Aucune tâche</p>";
    } else {
      calendrier[jour].forEach(item => {
        calendrierDiv.innerHTML += `<p>${item.membre} doit ${item.tache} dans ${item.piece}</p>`;
      });
    }
  });
}

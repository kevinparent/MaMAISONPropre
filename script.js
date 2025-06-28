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

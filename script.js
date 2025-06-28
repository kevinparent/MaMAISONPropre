const accessoires = [
    // Super Heros
  {
    nom: "Avatar super-héros Femme",
    image: "./images/avatar_shero_femme.png",
    prix: 10
  },
  {
    nom: "Avatar super-héros Homme",
    image: "./images/avatar_shero_homme.png",
    prix: 10
  },
  {
    nom: "Avatar super-héros fille",
    image: "./images/avatar_shero_fille.png",
    prix: 10
  },
  {
    nom: "Avatar super-héros garcon",
    image: "./images/avatar_shero_garcon.png",
    prix: 10
  },

  //Astronautes
  {
    nom: "Avatar Astronaute Femme",
    image: "./images/avatar_asrtro_femme.png",
    prix: 10
  },
  {
    nom: "Avatar Astronaute Homme",
    image: "./images/avatar_asrtro_homme.png",
    prix: 10
  },
  {
    nom: "Avatar Astronaute fille",
    image: "./images/avatar_asrtro_fille.png",
    prix: 10
  },
  {
    nom: "Avatar Astronaute garcon",
    image: "./images/avatar_asrtro_garcon.png",
    prix: 10
  },
  //Princes et Princesses
  {
    nom: "Avatar Reine",
    image: "./images/avatar_reine_femme.png",
    prix: 10
  },
  {
    nom: "Avatar Roi",
    image: "./images/avatar_roi_homme.png",
    prix: 10
  },
  {
    nom: "Avatar Princesse",
    image: "./images/avatar_princesse_fille.png",
    prix: 10
  },
  {
    nom: "Avatar Prince",
    image: "./images/avatar_prince_garcon.png",
    prix: 10
  },
  //Pirates
  {
    nom: "Avatar Pirate Femme",
    image: "./images/avatar_pirate_femme.png",
    prix: 10
  },
  {
    nom: "Avatar Pirate Homme",
    image: "./images/avatar_pirate_homme.png",
    prix: 10
  },
  {
    nom: "Avatar Pirate fille",
    image: "./images/avatar_pirate_fille.png",
    prix: 10
  },
  {
    nom: "Avatar Pirate garcon",
    image: "./images/avatar_pirate_garcon.png",
    prix: 10
  },
  // Pyjamas
  {
    nom: "Avatar Pyjama Femme",
    image: "./images/avatar_pyjamas_femme.png",
    prix: 10
  },
  {
    nom: "Avatar Pyjama Homme",
    image: "./images/avatar_pyjamas_homme.png",
    prix: 10
  },
  {
    nom: "Avatar Pyjama fille",
    image: "./images/avatar_pyjamas_fille.png",
    prix: 10
  },
  {
    nom: "Avatar Pyjama garcon",
    image: "./images/avatar_pyjamas_garcon.png",
    prix: 10
  }
];

// Charger les membres depuis le localStorage s'ils existent
const membres = JSON.parse(localStorage.getItem("membres")) || [];
// vérifier les anciens membres sans points/XP
membres.forEach(m => {
  if (m.points === undefined) m.points = 0;
  if (m.experience === undefined) m.experience = 0;
  if (m.niveau === undefined) m.niveau = 1;
  if (!m.collection) {
    m.collection = [m.avatar]; // si pas de collection, on l'initialise
  }
});

const formMembre = document.getElementById("formMembre");
const listeMembres = document.getElementById("listeMembres");

// afficher la liste au démarrage
afficherMembres();

formMembre.addEventListener("submit", function(event) {
  event.preventDefault();

  const prenom = document.getElementById("prenom").value;
  const age = parseInt(document.getElementById("age").value);
  const avatar = document.getElementById("avatar").value;

 membres.push({
  prenom: prenom,
  age: age,
  avatar: avatar,
  points: 0,
  experience: 0,
  niveau: 1,
  collection: [avatar] // il démarre avec son avatar par défaut
});

  // sauvegarder dans localStorage
  localStorage.setItem("membres", JSON.stringify(membres));

  afficherMembres();
  formMembre.reset();
});

function afficherMembres() {
  listeMembres.innerHTML = "";
  membres.forEach(function(membre, index) {
    let options = "";
    membre.collection.forEach(ava => {
      options += `<option value="${ava}" ${ava === membre.avatar ? "selected" : ""}>${ava}</option>`;
    });

    listeMembres.innerHTML += `
      <li>
        <img src="${membre.avatar}" alt="avatar" width="50">
        ${membre.prenom} (âge : ${membre.age} ans)
        - Niveau ${membre.niveau} (XP : ${membre.experience}) - Points : ${membre.points}
        <br>
        <select onchange="changerAvatar(${index}, this.value)">
          ${options}
        </select>
        <button onclick="supprimerMembre(${index})">Supprimer ❌</button>
      </li>
    `;
  });
}

function changerAvatar(index, nouvelAvatar) {
  membres[index].avatar = nouvelAvatar;
  localStorage.setItem("membres", JSON.stringify(membres));
  afficherMembres();
}


// Charger les pièces depuis localStorage
let pieces = JSON.parse(localStorage.getItem("pieces"));
if (!pieces) {
  pieces = ["Cuisine", "Salon", "Chambre", "Salle de bain"];
  localStorage.setItem("pieces", JSON.stringify(pieces));
}

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
let taches = JSON.parse(localStorage.getItem("taches"));
if (!taches) {
  taches = [
    { nom: "Passer l'aspirateur", piece: "Salon" },
    { nom: "Faire la vaisselle", piece: "Cuisine" },
    { nom: "Ranger les jouets", piece: "Chambre" },
    { nom: "Nettoyer le lavabo", piece: "Salle de bain" }
  ];
  localStorage.setItem("taches", JSON.stringify(taches));
}

const formTache = document.getElementById("formTache");
const listeTaches = document.getElementById("listeTaches");
const pieceTache = document.getElementById("pieceTache");

// mettre à jour le menu déroulant des pièces
function mettreAJourSelectPieces() {
    pieceTache.innerHTML = `<option value="all">Toutes les pièces</option>`;
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

if (pieceChoisie === "all") {
  // ajouter la même tâche pour toutes les pièces
  pieces.forEach(function(piece) {
    taches.push({ nom: nomTache, piece: piece });
  });
} else {
  taches.push({ nom: nomTache, piece: pieceChoisie });
}

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

  afficherCalendrier(calendrier);
  
  localStorage.setItem("calendrier", JSON.stringify(calendrier));
}

function validerTache(prenom, bouton) {
  const membre = membres.find(m => m.prenom === prenom);
  if (membre) {
    membre.points += 5;
    membre.experience += 10;
    if (membre.experience >= membre.niveau * 20) {
      membre.niveau += 1;
      membre.experience = 0;
      alert(`${membre.prenom} est monté au niveau ${membre.niveau} ! 🎉`);
    }
    // sauvegarde
    localStorage.setItem("membres", JSON.stringify(membres));
    afficherMembres();
    // désactiver le bouton pour éviter les clics multiples
    bouton.disabled = true;
    bouton.textContent = "Terminé ✔️";
  }
}
// Charger le calendrier s'il existe
const calendrierSauvegarde = JSON.parse(localStorage.getItem("calendrier"));

if (calendrierSauvegarde) {
  afficherCalendrier(calendrierSauvegarde);
}

function afficherCalendrier(calendrier) {
  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  calendrierDiv.innerHTML = "";

  calendrierDiv.innerHTML += `
    <table id="tableCalendrier">
      <thead>
        <tr>
          ${jours.map(jour => `<th>${jour}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${jours.map(jour => {
            let contenu = "";
            if (calendrier[jour].length === 0) {
              contenu = "<p>Aucune tâche</p>";
            } else {
              contenu = calendrier[jour].map(item => `
                <div style="margin-bottom:5px;">
                  ${item.membre} <br>
                  ${item.tache} <br>
                  ${item.piece} <br>
                  <button onclick="validerTache('${item.membre}', this)">J’ai terminé !</button>
                </div>
              `).join("");
            }
            return `<td>${contenu}</td>`;
          }).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function supprimerMembre(index) {
  if (confirm("Es-tu sûr de vouloir supprimer ce membre ?")) {
    membres.splice(index, 1);
    localStorage.setItem("membres", JSON.stringify(membres));
    afficherMembres();
  }
}
function acheterAccessoire(nouvelAvatar, prix) {
  const prenom = prompt("Quel membre veut acheter cet accessoire ? (entre le prénom exactement)");

  const membre = membres.find(m => m.prenom.toLowerCase() === prenom.toLowerCase());

  if (!membre) {
    alert("Membre introuvable !");
    return;
  }

  if (membre.points >= prix) {
    membre.points -= prix;
    if (!membre.collection.includes(nouvelAvatar)) {
    membre.collection.push(nouvelAvatar);
    }

    membre.avatar = nouvelAvatar;
    localStorage.setItem("membres", JSON.stringify(membres));
    afficherMembres();
    alert(`${membre.prenom} a acheté un nouvel avatar ! 🎉`);
  } else {
    alert(`${membre.prenom} n'a pas assez de points.`);
  }
}

function genererBoutique() {
  const boutiqueDiv = document.getElementById("boutique");
  boutiqueDiv.innerHTML = "";

  accessoires.forEach(function(item) {
    boutiqueDiv.innerHTML += `
      <div class="accessoire">
        <img src="${item.image}" alt="${item.nom}" width="80">
        <p>${item.nom}<br>Prix : ${item.prix} points</p>
        <button onclick="acheterAccessoire('${item.image}', ${item.prix})">Acheter</button>
      </div>
    `;
  });
}

function afficherPage(nomPage) {
  document.querySelectorAll(".page").forEach(sec => sec.style.display = "none");
  document.getElementById("page-" + nomPage).style.display = "block";
}

afficherPage('famille'); // page par défaut

genererBoutique();

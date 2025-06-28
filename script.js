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

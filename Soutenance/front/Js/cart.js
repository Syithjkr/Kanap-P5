let panier = JSON.parse(localStorage.getItem("panier"));
let qty = 0;
let total = 0;
contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
products = [];
orderId = undefined;
inputError = 0;

// SINON SI nous nous trouvons dans la page panier on execute notre code
if (location.href.search("confirmation") > 0) {
    // SINON c'est que nous sommes sur la page "confirmation.html" donc on affiche le numero de commande stocké dans l'URL
    // et on supprime le panier du localStorage pour pouvoir passer d'autres commandes
  
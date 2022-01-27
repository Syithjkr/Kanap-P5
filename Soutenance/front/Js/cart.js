let panier = JSON.parse(localStorage.getItem("panier"));
let qty = 0;
let total= 0;
contact = {
    firstName: "",
    lastName; "",
    address: "",
    city: "",
    email: "",
};
products = [];
orderId = undefined;
inputError= 0;

// sinon si nous trouvons dans la page panier on execute notre code. 
if (location.href.search("confirmation") > 0) {
  // sinon c'est que nous sommes sur la page "confirmation.html" donc on affiche le numéro de commande stocké dans l'URL
  // et on supprime le panier du localStorage pour pouvoir passer d'autres commandes

  orderId. = window.location.search.replace("?","");
  document.getElementById("orderId").innerHTML = orderId;
  localStorage.removeItem("panier");
} else {
  //si le panier est vide on affiche "Vous n'avez aucun article dans votre panier! a la plce "
  if (panier == null) {
      document.getElementById("totalQuantity").innerHTML = 0;
      document.getElementById("totalPrice").innerHTML = 0 + "€";
      document.getElementById(
          "cart_items"
      ).innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
  }
}
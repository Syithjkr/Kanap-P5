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
  
    orderId = window.location.search.replace("?", "");
    document.getElementById("orderId").innerHTML = orderId;
    localStorage.removeItem("panier");
  } else {
    // SI le panier est vide on affiche "Vous n'avez aucun article dans votre panier !" à la place
    if (panier == null) {
      document.getElementById("totalQuantity").innerHTML = 0;
      document.getElementById("totalPrice").innerHTML = 0 + " €";
      document.getElementById(
        "cart__items"
      ).innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
    }
    // SINON on affiche les vignettes de chaque élément du panier
    //
    else {
        for (let article of panier) {
          qty += article.quantity;
          total += article.quantity * article.price;
          let html = `
      <article class="cart__item" data-id="${article.id}" id="${article.id}${article.color}" data-color="${article.color}">
                    <div class="cart__item__img">
                      <img src="${article.srcImg}" alt="${article.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${article.name}</h2>
                        <p>${article.color}</p>
                        <p>${article.price} &euro;</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>
      `;
          document.getElementById("cart__items").innerHTML += html;
        }
// Affichage de la quantité et du prix total
document.getElementById("totalQuantity").innerHTML = qty;
document.getElementById("totalPrice").innerHTML = Intl.NumberFormat(
  "fr-FR",
  {
    style: "currency",
    currency: "EUR",
  }
).format(total);

//
  //------ Fonction qui recalcule le total des quantité et du prix
  function recalc() {
    let cart = JSON.parse(localStorage.getItem("panier"));
    let quantity = 0;
    let total = 0;
    for (article of cart) {
      quantity += parseInt(article.quantity);
      total += parseFloat(article.price) * parseInt(article.quantity);
    }
    document.getElementById("totalQuantity").innerHTML = quantity;
    document.getElementById("totalPrice").innerHTML = Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
      }
    ).format(total);

    if (quantity == 0) {
      localStorage.removeItem("panier");
      panier = null;
    }
  }

  let vignettes = document.getElementsByClassName("cart__item");
  let suppressions = document.getElementsByClassName("deleteItem");


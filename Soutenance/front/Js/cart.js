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

// Boucle qui ajoute un eventListener sur toute les vignettes d'article affichés dans le panier
for (let i = 0; i < vignettes.length; i++) {
    let vignette = vignettes[i];
    vignette.addEventListener("input", (e) => {
      //On envoie la quantité selectionnée dans le panier
      panier[i].quantity = parseInt(e.target.value);
      // On met à jour le localstorage
      localStorage.setItem("panier", JSON.stringify(panier));
      // on lance la fonction qui va mettre à jour le prix et le total de la page panier
      recalc();
    });
  }
//
  // Boucle qui ajoute un eventListener sur toute les vignettes d'article affichés dans le panier
  for (let i = 0; i < suppressions.length; i++) {
    let suppr = suppressions[i];
    suppr.addEventListener("click", () => {
      // On supprime de notre panier l'élément de la boucle selectionné via splice()
      panier.splice(i, 1);
      // on supprime le code HTML de ce même élément
      vignettes[i].remove();
      // On met à jour le localstorage
      localStorage.setItem("panier", JSON.stringify(panier));
      // on lance la fonction qui va mettre à jour le prix et le total de la page panier
      recalc();
    });
  }

    //------Formulaire utilisateur

  // On récupère nos balises d'input du formulaire
  inputFirstName = document.querySelectorAll(
    ".cart__order__form__question input"
  )[0];
  inputLastName = document.querySelectorAll(
    ".cart__order__form__question input"
  )[1];
  inputAddress = document.querySelectorAll(
    ".cart__order__form__question input"
  )[2];
  inputCity = document.querySelectorAll(
    ".cart__order__form__question input"
  )[3];
  inputEmail = document.querySelectorAll(
    ".cart__order__form__question input"
  )[4];Ò
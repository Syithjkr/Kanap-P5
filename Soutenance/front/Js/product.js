// on récupére l'id de notre produit depuis l'url pour cibler notre canapé dans l'API
let productId = window.location.search.replace("?id=", "");
let image = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let colorSelector = document.getElementById("colors");
let quantitySelector = document.getElementById("quantity");
let validateInput = document.getElementById("addToCart");
quantitySelector.value = "";
let product = [];
let cartUser = {
  name: "",
  price: "",
  id: "",
  color: "",
  quantity: "0",
  srcImg: "",
  altTxt: "",
};

/* Je récupére mon produit depuis mon API */
const fetchApiProduct = async () => {
  await fetch(`https://api-kanap-eu.herokuapp.com/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => (product = data));
};

// Je modifie les éléments de la page par rapport au produit séléctionné
const productAddInfos = async () => {
  await fetchApiProduct();
   //Titre document
   document.title = product.name;

   //Image section
   image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
 
   //Prix
   prix.innerHTML = product.price;
 
   //Description
   description.innerHTML = product.description;

    //Boucle pour la liste déroulante du choix de couleurs
  for (let i = 0; i < product.colors.length; i++) {
    selectorColor = document.getElementById("colors");
    selectorColor.innerHTML += `
    <option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
  //on stock les infos nom/prix/id dans l'objet cartUser
  cartUser.name = product.name;
  cartUser.price = product.price;
  cartUser.id = product._id;
  cartUser.srcImg = product.imageUrl;
  cartUser.altTxt = product.altTxt;
};
productAddInfos();

// On envoie la couleur choisie de la liste déroulante dans l'objet cartUser
colorSelector.addEventListener("input", (e) => {
  cartUser.color = e.target.value;
});
// On recupere la quantité choisie dans l'objet cartUser
quantitySelector.addEventListener("change", (e) => {
  if (e.target.value != "" || e.target.value != 0) {
    cartUser.quantity = parseInt(e.target.value);
  }
});
// ----------------NOUVELLE VALIDATION FORM-------------
validateInput.addEventListener("click", () => {
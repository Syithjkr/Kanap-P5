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
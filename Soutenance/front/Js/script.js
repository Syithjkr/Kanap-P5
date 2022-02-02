/*J'initialise la variable article qui contiendra mon api */
let articles = [];

/*Je crée une fonction qui récupére tout les articles de mon API */
async function fetchApi(){
    await fetch("https://api-kanap-eu.herokuapp.com/api/products")
      .then((res) => res.json())
      // Je stock le tout dans une variable articles
      .then((data) => (artcile = data));
}
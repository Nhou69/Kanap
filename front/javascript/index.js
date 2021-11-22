const url = "http://localhost:3000/api/products/";
const itemsTag = document.getElementById("items");

//Fonction appel API pour afficher tous les produits dans la page d'accueil
showProductsInIndex()

function showProductsInIndex(){
  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data)
      showAllProduct(data)
    })
    .catch((error) => {
      console.error(error);
      itemsTag.innerHTML = `<div>Erreur de connexion au serveur</div>`
  });
};

function showAllProduct(data){
  for (product of data) {
    console.log(product);
    itemsTag.innerHTML += `
              <a href="./product.html?id=${product._id}">
                  <article>
                  <img src="${product.imageUrl}" alt="${product.atlTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                  </article>
              </a>
          `;
  }
}
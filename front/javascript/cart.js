/*On rappelle ce qu'il y a dans le local storage => cad tout ce qu'il y a dans le panier */
let productsInLocalStorage = JSON.parse(localStorage.getItem('products'))
console.log(productsInLocalStorage)
const cartContent = document.getElementById('cart__items')

if (productsInLocalStorage === null || productsInLocalStorage == 0 ){
const emptyCart = `<div>Le panier est vide</div>`
cartContent.innerHTML = emptyCart
} else {
    for (product of productsInLocalStorage){
        cartContent.innerHTML +=`
        <article class="cart__item" data-id="${product._id}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price/10}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${product.colors}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" id="${product._id}" data-colors="${product.colors}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
    }
}

/* suppression d'un article */
for(let i = 0; i < productsInLocalStorage.length; i++){
let btnDelete = document.getElementsByClassName('deleteItem') [i]
btnDelete.addEventListener("click", function (e){
  const id = e.target.id
  const colors = e.target.dataset.colors
  const productToDelete = productsInLocalStorage.find(element => element._id === id && element.colors ==colors)
  const remainingProducts = productsInLocalStorage.filter(element => element !== productToDelete)

  localStorage.setItem('products', JSON.stringify(remainingProducts))
  window.location.reload()
  })
}

/* Calcul quantité et produit */
const cartQuantity = document.getElementById("totalQuantity")
const cartTotalPrice = document.getElementById("totalPrice")
let totalQuantityProduct = 0
let totalPriceProduct = 0
for(product of productsInLocalStorage){
  totalQuantityProduct = totalQuantityProduct + product.quantity
  totalPriceProduct = totalPriceProduct + product.quantity * product.price
}
cartQuantity.innerText = totalQuantityProduct
cartTotalPrice.innerText = totalPriceProduct /10

/* Expression régulière du formulaire */
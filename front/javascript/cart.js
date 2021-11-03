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
  const productToDelete = productsInLocalStorage.find(element => element._id === id && element.colors == colors)
  const remainingProducts = productsInLocalStorage.filter(element => element !== productToDelete)

  localStorage.setItem('products', JSON.stringify(remainingProducts))
  window.location.reload()
  })
}

/* retirer ou ajouter un produit */

for(let i = 0; i < productsInLocalStorage.length; i++){
  let productQuantity = document.getElementsByClassName('itemQuantity') [i]
  console.log(productQuantity.value)

  /*productQuantity.value.addEventListener('change', function(e){
      const foundProduct = productsInLocalStorage.find(element => element._id === selectedProduct._id)
      const foundColor = productsInLocalStorage.find(colorValue => colorValue.colors === selectedProduct.colors)
      if (foundProduct && foundColor) {
          foundProduct.quantity += parseInt(quantityProducts.value)
      } else {
          productsInLocalStorage.push(selectedProduct)
      }*/
      //localStorage.setItem('products', JSON.stringify(productsInLocalStorage))

      //window.location.reload()
}

/* total quantité produit et total prix */
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
/*Nom et Prénom */
const form = document.getElementsByClassName('cart__order__form') [0]
form.firstName.addEventListener('change', function(){
  validName(this)
})
form.lastName.addEventListener('change', function(){
  validName(this)
})

const validName = function (inputName) {
  let nameRegExp = new RegExp("^[^- ][a-zA-Z '\-àâäéèêëïîôöùûü]*[^- ]$", "g")
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Validé"
    return true
  } else {
    inputName.nextElementSibling.innerHTML = "Saisissez votre prénom ou votre nom"
    return false
  }
}

/*adresse */
form.address.addEventListener('change', function(){
  validAddress(this)
})

const validAddress = function (inputAdress) {
  let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '\-àâäéèêëïîôöùûü]*[^- ]$", "g")
  let testAdress = addressRegExp.test(inputAdress.value)
  if (testAdress) {
    inputAdress.nextElementSibling.innerHTML = "Validé"
    return true
  } else {
    inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse"
    return false
  }
}

/*Ville*/
form.city.addEventListener('change', function(){
  validCity(this)
})

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[^- ][a-zA-Z '\-àâäéèêëïîôöùûü]*[^- ]$", "g")
  let testCity = cityRegExp.test(inputCity.value)
  if (testCity) {
    inputCity.nextElementSibling.innerHTML = "Validé"
    return true
  } else {
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville"
    return false
  }
}

/*Email*/
form.email.addEventListener("change", function () {
  validEmail(this);
})

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g")
  let testEmail = emailRegExp.test(inputEmail.value)
  if (testEmail) {
    inputEmail.nextElementSibling.innerHTML = "Validé"
    return true
  } else {
    inputEmail.nextElementSibling.innerHTML = "Saisissez votre adresse mail complète"
    return false
  }
}

form.addEventListener('submit', function(e){
  if (validName(form.firstName) && validName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)){
    form.submit()
  } else{
    e.preventDefault()
  }
})
/*On rappelle ce qu'il y a dans le local storage => cad tout ce qu'il y a dans le panier */
let productsInLocalStorage = JSON.parse(localStorage.getItem('products'))
console.log(productsInLocalStorage)
const cartContent = document.getElementById('cart__items')

if (productsInLocalStorage === null || productsInLocalStorage == 0 ){
const emptyCart = `<div>Le panier est vide</div>`
cartContent.innerHTML = emptyCart
} else {
    for (product in productsInLocalStorage){
        cartContent.innerHTML +=`
        <article class="cart__item" data-id="${productsInLocalStorage.id}">
                <div class="cart__item__img">
                  <img src="${productsInLocalStorage[product].imageUrl}" alt="${productsInLocalStorage[product].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${productsInLocalStorage[product].name}</h2>
                    <p>${productsInLocalStorage[product].price/10}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productsInLocalStorage[product].colors}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsInLocalStorage[product].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
    }
}
let btnDelete = document.getElementsByClassName('deleteItem') [0]

for (product in productsInLocalStorage){
btnDelete.addEventListener("click", function (){
    let idDelete = productsInLocalStorage[product].id
    let colorDelete = productsInLocalStorage[product].colors

    productsInLocalStorage = productsInLocalStorage.filter(element => element.id !== idDelete /*&& color => colors.colors !== colorDelete*/)

    localStorage.setItem('products', JSON.stringify(productsInLocalStorage))
    window.location.reload()
    })
    
}
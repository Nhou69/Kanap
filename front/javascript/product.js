// 1 . Récupérer l'identifiant du produit depuis l'url
//on récupère l'ensemble de l'url:
const UrlId = new URL(window.location.href)
console.log(UrlId)
    //on récupère juste ce qu'il y a après le nom '?id'
let getId = UrlId.searchParams.get("id")
console.log(getId)

// 2 . Construire une nouvelle url à partir de l'identifiant du produit
const url = `http://localhost:3000/api/products/`
console.log(url)
    //concaténation des variables pour former une nouvelle url
let newUrl = url + getId
console.log(newUrl)

// 3 . Appeler cette nouvelle url avec la méthode fetch
// 4 . Remplacer les données statiques par le résultat du fetch 
const itemImage = document.getElementsByClassName('item__img')[0]
const itemTitle = document.getElementById("title")
const itemPrice = document.getElementById("price")
const itemDescription = document.getElementById("description")
const itemColors = document.getElementById("colors")

let product;

fetch(newUrl)
    .then(reponse => reponse.json())
    .then(content => {
        console.log(content)
        product = content
        let name = content.name
        let description = content.description
        let imageUrl = content.imageUrl
        let altTxt = content.altTxt
        let colors = content.colors
        let price = content.price / 10
        let id = content._id

        itemImage.innerHTML = `
        <img src="${ imageUrl }" alt="${ altTxt }">
    `

        itemTitle.innerText = name

        itemPrice.innerText = price

        itemDescription.innerText = description

        for (let color of colors) {
            itemColors.innerHTML += `
            <option value="${ color }">${ color }</option>
        `
        }
    })
    .catch(error => console.error(error))

const addToCartButton = document.getElementById('addToCart')
addToCartButton.addEventListener("click", function() {
    const quantityProducts = document.getElementById('quantity')
    const selectedProduct = {...product, quantity: parseInt(quantityProducts.value) }
        /*{id: product.id, description: product.description, price: product.price, ..., quantity: quantityProducts.value}*/

    /*  const products = JSON.parse(localStorage.getItem('products')) || [];

    //On vérifie si le produit est déjà dans le panier ==> si oui on incrémente la quantité sinon on l'ajoute
    const foundProduct = products.find(element => element._id === selectedProduct._id)
    if (foundProduct) {
        foundProduct.quantity += parseInt(quantityProducts.value)
    } else {
        products.push(selectedProduct)
    }
    localStorage.setItem('products', JSON.stringify(products)); */

    // Robert Approach

    window.location.reload();
})
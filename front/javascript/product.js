// 1 . Récupérer l'identifiant du produit depuis l'url
//on récupère l'ensemble de l'url:
const UrlId = new URL(window.location.href)

    //on récupère juste ce qu'il y a après le nom '?id'
let getId = UrlId.searchParams.get("id")

// 2 . Construire une nouvelle url à partir de l'identifiant du produit
const url = `http://localhost:3000/api/products/`

    //concaténation des variables pour former une nouvelle url
let newUrl = url + getId


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
    const selectedColor = document.getElementById("colors").value
    if (selectedColor === ""){
        alert("Vous n'avez pas sélectionné la couleur du canapé !")
        return
    } else {
    product.colors = selectedColor
    }
    /*Condition des couleurs, si la valeur de couleur est vide"" alors on retourne une erreur*/

    const quantityProducts = document.getElementById('quantity')
    if (quantityProducts.value === '0'){
        alert("Veuillez définir le nombre d'article !")
        return
    }
    /*Si la couleur est ok mais que la quantité n'est pas défini alors on stoppe la suite de l'execution*/

    const selectedProduct = {...product, quantity: parseInt(quantityProducts.value) }
        /* le ...product correspond à {id: product.id, description: product.description, price: product.price, etc., quantity: quantityProducts.value}*/
    
    let productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
    /*product = key du du local storage */

    //On vérifie si le produit est déjà dans le panier ==> si oui on incrémente la quantité sinon on l'ajoute
    const foundProduct = productsInLocalStorage.find(element => element._id === selectedProduct._id)
    const foundColor = productsInLocalStorage.find(colorValue => colorValue.colors === selectedProduct.colors)
    if (foundProduct && foundColor) {
        foundProduct.quantity += parseInt(quantityProducts.value)
        alert(quantityProducts.value + 'x ' + selectedProduct.name + ' ' + selectedProduct.colors + ' ont été ajouté au panier !')
    } else {
        productsInLocalStorage.push(selectedProduct)
        alert(quantityProducts.value + 'x ' + selectedProduct.name + ' ' + selectedProduct.colors + ' ont été ajouté au panier !')
    }
    localStorage.setItem('products', JSON.stringify(productsInLocalStorage))

    window.location.reload()
})
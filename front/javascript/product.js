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
console.log (newUrl)

// 3 . Appeler cette nouvelle url avec la méthode fetch
// 4 . Remplacer les données statiques par le résultat du fetch 
const itemsImage = document.getElementsByClassName('item__img')
const itemsTitle = document.getElementById("title")
const itemsDescription = document.getElementById("description")
const itemsColors = document.getElementById("colors")

fetch(newUrl)
.then(reponse => reponse.json())
.then(content => console.log(content))
.then(content => {
    let name = content.name
    let description = content.description
    let imageUrl = content.imageUrl
    let altTxt = content.altTxt
    let colors = content.colors
    let price = content.price / 10
    let id = content._id

    itemsImage.innerHTML += `
        <img src="${ imageUrl }" alt="${ atlText}">
    `
    itemsTitle.innerHTML += `
        <h1 id="title">${ name }</h1>
    `
    itemsDescription.innerHTML += `
        <p id="description">${ description }</p>
    `
    itemsColors.innerHTML += `
        <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>
        <option value="${ colors }">${ colors }</option>
    </select>
    `
})
.catch(error => console.error(error))
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
fetch(newUrl)
.then(reponse => reponse.json())
.then((data) => console.log(data))
.catch(error => console.error(error))

// 4 . Remplacer les données statiques par le résultat du fetch 
const itemsImage = document.getElementsByClassName('item__img')
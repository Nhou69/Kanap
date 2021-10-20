const url = "http://localhost:3000/api/products"
const itemsTag = document.getElementById("items")

fetch(url)
.then(reponse => reponse.json())
.then(json => {
    for(product of json) {
        console.log(product)
        itemsTag.innerHTML += `
        <a href="./product.html?id=${ product._id }">
            <article>
              <img src="${ product.imageUrl }" alt=" ${ product.name }">
              <h3 class="productName">${ product.name }</h3>
              <p class="productDescription"> ${ product.description }</p>
            </article>
          </a>
        `

    }
})
.catch(erreur => console.error(erreur))

/*fetch(url) 
.then(function(response) {
    return response.json()
})
.then(function(data) {
    return data;
})
.catch(function(error) {
    console.error(error);
})*/


const url = "http://localhost:3000/api/products/"
const itemsTag = document.getElementById("items")

fetch(url)
.then(reponse => reponse.json())
.then(data => {
    for(product of data) {
        console.log(product)
        itemsTag.innerHTML += `
        <a href="./product.html?id=${ product._id }">
            <article>
              <img src="${ product.imageUrl }" alt="${ product.atlText}">
              <h3 class="productName">${ product.name }</h3>
              <p class="productDescription">${ product.description }</p>
            </article>
          </a>
        `
    }
})
.catch(error => console.error(error))


/*fetch(url) 
.then(function(reponse) {
    return reponse.json()
})
.then(function(data) {
    return data;
})
.catch(function(error) {
    console.error(error);
})*/


//On  récupère le numéro de commande via l'URL //même chose que dans product.js
const urlConfirmation = new URL(window.location.href);
//Fonction pour récupérer l'orderId de l'url
const getId = () => {
    console.log(urlConfirmation)
    const getConfirmationId = urlConfirmation.searchParams.get("name")
    console.log(getConfirmationId)
    document.getElementById('orderId').innerHTML = getConfirmationId
}
getId()

//Codes permettant lasuppression du local storage
localStorage.removeItem('products');
localStorage.removeItem('orderId');// équivalent ci dessous
//['products', 'orderId'].forEach(item => localStorage.removeItem(item));
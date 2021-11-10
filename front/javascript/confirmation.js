//Récupération du numéro de commande en passant par l'URL
//Déclaration de la constante url
const urlConfirmation = new URL(window.location.href);
//Fonction pour récupérer l'orderId de l'url
const getConfirmationId = () => {
    console.log(urlConfirmation)
    const params = urlConfirmation.searchParams
    const orderConfirm = params.get('name')
    console.log(orderConfirm)
    document.getElementById('orderId').innerHTML = orderConfirm
}
getConfirmationId();
//socket del lado del cliente
const socket = io();

const productList = document.getElementById("productsList");
const deleteProduct = document.getElementById("deleteProduct");

//delete a product
deleteProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = document.getElementById("pid").value;
    fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    })
});


//recibe un mensaje del servidor
socket.on("products", (products) => {
    let showProducts = "";
    products.forEach((prod) => {
    showProducts += `Product ${prod.code} is a ${prod.title}, price: $${prod.price}</br>`;
    });
    productList.innerHTML = `${showProducts}`;
});

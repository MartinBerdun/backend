const addToCartForms = document.querySelectorAll('[id^="addToCart-"]');
const logoutBtn = document.getElementById("logoutButton");
const addButton = document.getElementsByClassName("botonAgregar")
const goToCart = document.getElementById("goToCart");

addToCartForms.forEach((form) => {
    addEventListener("submit", (e) => {
        e.preventDefault();

        const productId = form.getAttribute("id").split("-")[1];
        const cartId = document.querySelector('#userCartId').textContent
        console.log(cartId);

        const quantity = {
            "quantity":1,
        }
        
        fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        })
            .then(() => {
            Swal.fire({
                title: "Product added to cart!",
                text: `You added one product to Cart`,
                toast: true,
                position: "top-right",
                icon: "success",
            });
            })
            .catch((error) => console.log(error));
        });
});


logoutBtn.addEventListener("click", () => {
    fetch(`/api/users/logout`, {
        method: "GET",
    })
        .then(() => {
        Swal.fire({
            title: "Logout successful!",
            text: `Redirecting you... See you soon!`,
            allowOutsideClick: false,
            confirmButton: false,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            customClass: {
            popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
            confirmButton: "!bg-blue-600 !px-5",
            timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
            },
            willClose: () => {
            window.location.href = "/";
            },
        });
    })
    .catch((error) => console.log(error));
});


goToCart.addEventListener("click", () => {
    const cartId = document.querySelector('#userCartId').textContent

    window.location.href = `/cart/${cartId}`
});
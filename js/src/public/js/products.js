const addToCart = document.querySelectorAll('[id^="addToCart-"]');
const productId = document.getElementById("this_.id");



addToCart.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const quantity = {
            "quantity":3,
        }
    
        fetch(`/api/carts/64400c635ab188f813fab0f7/product/${productId}`, {
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



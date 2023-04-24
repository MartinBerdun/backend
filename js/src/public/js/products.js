const addToCartForms = document.querySelectorAll('[id^="addToCart-"]');

addToCartForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const productId = form.getAttribute("id").split("-")[1];

        const quantity = {
            "quantity":1,
        }
        
        fetch(`/api/carts/644562f03f09134e8f2dc238/product/${productId}`, {
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




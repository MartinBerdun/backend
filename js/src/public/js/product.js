const addToCartForms = document.querySelector('[id^="addToCart-"]');

addToCartForms.addEventListener("submit", (e) => {
        e.preventDefault();

        const productId = addToCartForms.getAttribute("id").split("-")[1];

        const cartId = document.querySelector('#userCartId').textContent;

        console.log({productId});

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
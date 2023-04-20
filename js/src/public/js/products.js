const addToCart = document.querySelectorAll('[id^="addToCart-"]');
// const productId = form.getAttribute("id").split("-")[1];
// console.log(productId);

// const addToCart = document.getElementById("addToCart")

addToCart.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // const productId = form.getAttribute("id").split("-")[1];
        // const prodTitle = form.closest("div").querySelector("h5").textContent;
    
        fetch(`/api/carts/64400c635ab188f813fab0f7/product/${productId}`, {
            method: "POST",
        })
            .then(() => {
            Swal.fire({
                title: "Product added to cart!",
                text: `You added ${prodTitle} to Cart`,
                toast: true,
                position: "top-right",
                icon: "success",
            });
            })
            .catch((error) => console.log(error));
        });
});



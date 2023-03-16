import CartManager from "./src/cartManager.js";
const manager = new CartManager();
const env = async () =>{

    //consulta
    const consult = await manager.consultCarts()
    console.log({consult});

    //add cart

    const cart = {
        name : "gergregerbebebeb"
    }
    
    const add = await manager.addCart(cart)
    console.log({add});

    //Get all carts

    const get = await manager.getCart()
    console.log({get});


}

env();
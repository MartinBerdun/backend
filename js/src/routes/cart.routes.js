import {Router} from "express";
import CartManager from "../cartManager.js";

const router = Router();
const manager = new CartManager();

router.post("/", async (req, res) => {
    const carts = await manager.consultCarts();
    
        const cart = {
            products: []
        };
    if(carts.length=undefined || carts.length === 0 ){
        cart.id =1
    } else {
        cart.id = carts[carts.length -1].id + 1; 
    }
    manager.addCart(cart);

        return res
            .status(200)
            .send({response: `Cart created.`});

    
});

router.get ("/", async (req,res)=>{
    const carts = await manager.getCart()
    res.send(carts)

})


export default router;
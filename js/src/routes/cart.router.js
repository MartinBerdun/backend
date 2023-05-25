import {Router} from "express";
// import CartManager from "../dao/filesManager/cartManager.js";
// import ProductManager from "../dao/filesManager/productManager.js";
import CartManagerDb from "../dao/dbManagers/cartsManagerDB.js";
// import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";
// import { cartModel } from "../dao/models/carts.model.js";

const router = Router();
const manager = new CartManagerDb();
// const prodManager = new ProductManagerDb ();

//GET CARTS
router.get("/", async (req, res) => {
    try {
        const carts = await manager.getCarts()
    return res.status(200).send({ status: "Success", payload: carts })
    } catch (error) {
        console.log(error);
    }
});


//ADD CART
router.post("/", async (req,res) => {
    try {
        let newCart = await manager.createCart();
        // const cart = req.body;
        if (!newCart) {
            return res
            .status(400)
            .send({ status: "Error", error: "Cart could not be added" });
        }
        return res.status(200).send({ status: "Success", payload: newCart}) 
        
    } catch (error) {
        console.log(error);
    }
})

//GET CART BY ID
router.get ("/:cid", async (req,res)=>{

    try {
    const cid = req.params.cid;

    const cartById =  await manager.getCartById(cid)

    if(!cartById) return res.status(404).send({ status: "Error", error: `Cart with Id ${cid} was not found` });

    return res.status(200).send({ status: "Success", message: cartById })
   } catch (error) {
    console.log(error);
   }

})

//ADD PRODUCT TO CART

    router.post("/:cid/product/:pid", async (req, res) => {
        try {
            const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        
        const newProduct = await manager.addProduct(cartId, productId, quantity);

        if (!newProduct || !cartId || !productId) {
            return res
            .status(404)
            .send({ status: "Error", error: "Invalid or incomplete values. No product added." });
        }

        return res.send({
            status: "OK",
            message: "Product successfully added to the cart",
            payload: newProduct,
        });
        } catch (error) {
            console.log(error);
        }
    });

//UPDATE CART

router.put("/:cid", async (req,res) =>{
    try {
        const cid = req.params.cid;
        const products = req.body;
        console.log(cid);
        console.log(products);
    
        if (!cid || !products)
        return res.status(400).send({
        status: "error",
        message: { error: `Incomplete or invalid values.No updated cart` },
        });

        const updatedCart = await manager.updateCart(cid,products)

        return res.status(200).send({
            status:"success",
            payload:updatedCart,
        })
    } catch (error) {
        console.log(error);
    }
})


//UPDATE QUANTITY IN CART

router.put("/:cid/product/:pid", async (req,res) =>{
    try {

        const {cid} = req.params;
        const {pid} = req.params;
        const {quantity} = req.body;

        const quantityUpdated = await manager.updateQuantityInCart(cid,pid,quantity)

        if(!quantityUpdated || !pid || !cid){
            return res.status(400).send({
                status:"error",
                message: { error: `Incomplete or invalid values. No quantity updated.` },
            })
        }

        return res.status(200).send({
            status:"success",
            payload:quantityUpdated,
        })

    } catch (error) {
        console.log(`error al actualizar ${error}`);
    }
})

//DELETE PRODUCTS FROM CARTS

router.delete("/:cid/product/:pid", async (req,res)=>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const deletedProductFromCart = await manager.deleteProductFromCart(cid,pid)

        if(!deletedProductFromCart || !cid || !pid){
            return res.status(400).send({
                status:"error",
                message: { error: `Incomplete or invalid values. No product deleted` },
            })
        }

        return res.status(200).send({
        status: "success",
        payload: deletedProductFromCart})

    } catch (error) {
        console.log(error);
    }
})

//DELETE CART

router.delete("/:cid", async (req,res)=>{
    try {
        const {cid} = req.params;

        const deletedCart = await manager.deleteCart(cid)

        if(!deletedCart || !cid){
            return res.status(400).send({
                status:"error",
                message: { error: `Incomplete or invalid values. Not deleted Cart` },
            })
        }

        return res.status(200).send({
            status: "success",
            payload: deletedCart,
        });
    } catch (error) {
        console.log(error);
    }
})




































    // const cid = req.params.cid;
    // const pid = req.params.pid;

    // const carts = await manager.consultCarts();
    // const cartIdFound = carts.findIndex((cart) => cart.id == cid);

    // const products = await prodManager.getProducts();
    // const productIdFound = products.findIndex((prod) => prod.id == pid);

    // if (cartIdFound === -1) {
    // return res.status(404).send({
    //     status: "error",
    //     message: { error: `Cart with ID ${cid} was not found` },
    // });
    // }

    // if (productIdFound === -1) {
    // return res.status(404).send({
    //     status: "error",
    //     message: { error: `Product with ID ${pid} was not found` },
    // });
    // }

    // await manager.addProducttoCart(cid,pid)
    

    // return res.status(200).send({ status: "Success", message: {
    //     success: `Product with ID ${pid} added to cart with ID ${cid} successfully`,
    // }, })

// })

export default router;
import {Router} from "express";
// import CartManager from "../dao/filesManager/cartManager.js";
// import ProductManager from "../dao/filesManager/productManager.js";
import CartManagerDb from "../dao/dbManagers/cartsManagerDB.js";
import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";
// import { cartModel } from "../dao/models/carts.model.js";

const router = Router();
const manager = new CartManagerDb();
const prodManager = new ProductManagerDb ();

//GET CARTS
router.get("/", async (req, res) => {
    try {
        const carts = await manager.getCarts()
    return res.status(200).send({ status: "Success", payload: carts })
    } catch (error) {
        console.log(error);
    }
    // const carts = await manager.consultCarts()
    // return res.status(200).send({ status: "Success", message: carts })
});


//ADD CART
router.post("/", async (req,res) => {
    try {
        const cart = req.body;
        if (!cart) {
            return res
            .status(400)
            .send({ status: "Error", error: "Cart could not be added" });
        }
        const newCart = await manager.createCart(cart);
        return res.status(200).send({ status: "Success", payload: newCart})   
    } catch (error) {
        console.log(error);
    }

    // const carts = await manager.addCart()
    
    // if(!carts) return res.status(404).send({ status: "Error", message: "Cart not added" });
    // return res.status(200).send({ status: "Success", message: {success: "Cart added succesfully", carts} })
})

//GET CART BY ID
router.get ("/:cid", async (req,res)=>{
    const cid = req.params.cid;
    const cartById =  await manager.getCartById(cid)
    if(!cartById) return res.status(404).send({ status: "Error", error: `Cart with Id ${cid} was not found` });
    return res.status(200).send({ status: "Success", message: cartById })

})

//ADD PRODUCT TO CART
// router.post ("/:cid/product/:pid", async (req,res) => {


    router.post("/:cid/product/:pid", async (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        const newProduct = await manager.addProduct(cartId, productId, quantity);
        if (!newProduct) {
            return res
            .status(404)
            .send({ status: "Error", error: "Product could not be found" });
        }
        return res.send({
            status: "OK",
            message: "Product successfully added to the cart",
            payload: newProduct,
        });
    });


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
import { Router } from "express";
// import ProductManager from "../dao/dbManagers/productManager.js";

import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";
// import MessagesManager from "../dao/dbManagers/messagesManagerDb.js";

import CartManagerDb from "../dao/dbManagers/cartsManagerDB.js";

const productManager = new ProductManagerDb();
const cartManager = new CartManagerDb();
// const messageManager = new MessagesManager()

const router = Router();

router.get("/products", async (req, res) => {
    const { limit = 10, page = 1, category, status, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
    } = await productManager.getProducts(limit,page, category, status, sort);
    res.render("products", {
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        style: "style.css",
        title: "Products",
    });
});

router.get("/product/:pid", async (req, res) => {
    const  {pid}  = req.params;
    const product = await productManager.getProductById(pid);
    res.render("product", {
        product,
        style: "product.css",
        title: "Product Detail",
    });
});

router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.render("cart", {
    cart,
    style: "cart.css",
    title: "Cart Detail",
    });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("realTimeProducts", {
        products,
        style: "style.css"
    });
});

export default router;

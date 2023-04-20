import { Router } from "express";
// import ProductManager from "../dao/dbManagers/productManager.js";

import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";
// import MessagesManager from "../dao/dbManagers/messagesManagerDb.js";

// import ProductManager from "../dao/filesManager/productManager.js";

const productManager = new ProductManagerDb();
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
    } = await productManager.getProducts(page, limit, category, status, sort);
    res.render("home", {
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

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("realTimeProducts", {
        products,
        style: "style.css"
    });
});

// router.get("/chat", async (req,res)=>{
//     const messages = await messageManager.getMessages();
//     return res.render(messages)
// })

export default router;
import { Router } from "express";
import ProductManager from "../productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("home", {products, style:"style.css"});
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {
        style: "style.css"
    });
});

export default router;
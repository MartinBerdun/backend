import { Router } from "express";
import { getProducts, addProduct,getProductById,updateProduct, deleteProduct } from "../controllers/products.controller.js";

import { authRole } from "../middlewares/auth.js";


const router = Router();

router.get ("/",(req, res, next) => authRole(req, res, next, "user"), getProducts);
router.get ("/:pid", getProductById);
router.post ("/",(req, res, next) => authRole(req, res, next, "admin"), addProduct);
router.put ("/:pid",(req, res, next) => authRole(req, res, next, "admin"), updateProduct);
router.delete ("/:pid",(req, res, next) => authRole(req, res, next, "admin"),deleteProduct);

export default router;


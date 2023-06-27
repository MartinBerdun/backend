import { Router } from "express";
import { getProducts, addProduct,getProductById,updateProduct, deleteProduct, mockingProducts } from "../controllers/products.controller.js";

import { authRole } from "../middlewares/auth.js";

/* import { addLogger } from "../utils/logger.js"; */


const router = Router();

router.get ("/", getProducts);
router.get ("/:pid", getProductById);
router.post ("/", addProduct);
router.put ("/:pid",(req, res, next) => authRole(req, res, next, "admin"), updateProduct);
router.delete ("/:pid",(req, res, next) => authRole(req, res, next, "admin"),deleteProduct);
router.post("/mockingproducts", mockingProducts);

export default router;


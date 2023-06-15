import { Router } from "express";
import { getProducts, addProduct,getProductById,updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { authRole } from "../middlewares/auth.js";


const router = Router();

router.get ("/", getProducts);
router.get ("/:pid", getProductById);
router.post ("/", addProduct);
router.put ("/:pid", updateProduct);
router.delete ("/:pid",deleteProduct);

export default router;

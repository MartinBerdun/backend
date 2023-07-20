import {Router} from "express";
import { getCarts, createCart, getCartById, addProduct, updateCart, updateQuantityInCart, deleteProductFromCart, deleteCart, createTicket } from "../controllers/carts.controller.js";

import { authRole } from "../middlewares/auth.js";

const router = Router();

//GET CARTS
router.get("/", getCarts);
router.post("/", createCart);

router.get("/:cid", getCartById);
router.put("/:cid", updateCart);
router.delete("/:cid", deleteCart);


router.post("/:cid/product/:pid",/* (req, res, next) => authRole(req, res, next, ["user", "premium"]), */addProduct);
router.put("/:cid/product/:pid", updateQuantityInCart);
router.delete("/:cid/product/:pid", deleteProductFromCart);

router.post("/:cid/purchase",createTicket);


export default router;
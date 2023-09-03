import { Router } from "express";
const router = Router();
import passport from "passport";
import { authRole } from "../middlewares/auth.js";

import { loginView, RegisterView, profileView, homeView, productView, cartView, ticketView, restoreView, newPasswordView, adminView} from "../controllers/views.controller.js";

router.get("/",  loginView);

router.get("/register",RegisterView);

router.get("/profile",passport.authenticate("jwt", { session: false }) ,profileView);

router.get("/products",passport.authenticate("jwt", { session: false }) ,homeView);

router.get("/product/:pid",passport.authenticate("jwt", { session: false }) , productView);

router.get("/cart/:cid", cartView);

router.get("/tickets", ticketView);

router.get("/restore", restoreView);

router.get("/resetPassword", newPasswordView);

router.get('/admin',/* (req, res, next) => authRole(req, res, next, ["admin", "user"]), 
    passport.authenticate('jwt', { session: false }),  */
    adminView
  )

export default router;

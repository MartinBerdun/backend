import { Router } from "express";
const router = Router();
import passport from "passport";

import { loginView, RegisterView, profileView, homeView, productView, cartView, ticketView, restoreView, newPasswordView} from "../controllers/views.controller.js";

router.get("/",  loginView);

router.get("/register",RegisterView);

router.get("/profile",passport.authenticate("jwt", { session: false }) ,profileView);

router.get("/products",passport.authenticate("jwt", { session: false }) ,homeView);

router.get("/product/:pid", productView);

router.get("/cart/:cid", cartView);

router.get("/tickets", ticketView);

router.get("/restore", restoreView);

router.get("/resetPassword", newPasswordView);








export default router;





























// import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";

// import CartManagerDb from "../dao/dbManagers/cartsManagerDB.js";
// import { checkLogged, checkLogin } from "../middlewares/auth.js";



// const productManager = new ProductManagerDb();
// const cartManager = new CartManagerDb();




// router.get ("/", checkLogged, (req,res) => {
//     res.render("login")
// })

// router.get("/register", checkLogged, (req, res) => {
//     res.render("register");
// });

// router.get("/profile", checkLogin, (req, res) => {
//     res.render("profile", {
//     user: req.session.user,});
// });

// router.get("/products", checkLogin, async (req, res) => {
//     const { limit = 10, page = 1, category, status, sort } = req.query;
//     const {
//         docs: products,
//         hasPrevPage,
//         hasNextPage,
//         nextPage,
//         prevPage,
//     } = await productManager.getProducts(limit,page, category, status, sort);
//     res.render("products", {
//         user : req.session.user,
//         products,
//         page,
//         hasPrevPage,
//         hasNextPage,
//         prevPage,
//         nextPage,
//         style: "style.css",
//         title: "Products",
//     });
// });

// router.get("/product/:pid", async (req, res) => {
//     const  {pid}  = req.params;
//     const product = await productManager.getProductById(pid);
//     res.render("product", {
//         product,
//         style: "product.css",
//         title: "Product Detail",
//     });
// });

// router.get("/cart/:cid", async (req, res) => {
//     const { cid } = req.params;
//     const cart = await cartManager.getCartById(cid);
//     res.render("cart", {
//     cart,
//     style: "cart.css",
//     title: "Cart Detail",
//     });
// });

// // router.get("/register", async (req, res) => {
// //     res.render("register")
// // })

// // router.get("/login", (req,res) => {
// //     res.render("login")
// // })

// // router.get ("/profile", (req,res) => {
// //     res.render("profile", {user: req.session.user})
// // })

// router.get("/realtimeproducts", async (req, res) => {
//     const products = await productManager.getProducts()
//     res.render("realTimeProducts", {
//         products,
//         style: "style.css"
//     });
// });



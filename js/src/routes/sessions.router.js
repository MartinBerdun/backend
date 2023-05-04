import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, createHash } from "../utils.js";
import passport from "passport";


const router = Router();

router.post("/register", passport.authenticate("register", {failureRedirect :"/failRegister"})
,async (req, res) => {
    return res.send({status:"success", message: "Register Success/ user registered"})
})

router.get("/failRegister", (req, res) => {
    res.send({status :"status", error :"Authentication error"})
})

router.post("/login",
    passport.authenticate("login", {failureRedirect:"/failLogin"}) ,
    async (req, res) => {
    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        email : req.user.email,
        age : req.user.age,
        rol : req.user.rol,
}

        return res.send({status:"success", message:"Logged in", payload : req.user})

    // try {
        // const {email, password} = req.body;

        // if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
        //     req.session.user = {
        //         name: `adminCoder`,
        //         email: email,
        //         age: "(not required)",
        //         rol: "admin"
        //     }
        // } else {
        //     const user = await userModel.findOne({email}).lean();
        //     if(!user) {
        //         return res
        //             .status(400)
        //             .send({status: "error", error: "User not found"});
        //     }

        //     if (!isValidPassword(user,password)) {
        //         return res.status(401)
        //         .send({status: "error", error: "unauthorized"});
        //     }

        //     delete user.password;

        //     req.session.user=user;
        // }

    //     return res.send({status:"success", message:"Logged in", payload : req.session.user})

    // } catch (error) {
    //     console.log(error);
    // }
})

router.get("/failLogin", (req, res) => {
    res.send({status :"error", error :"Authentication error"})
})

router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (!error) return res.send("Logout successful!");

        return res.send({ status: "error", message: "Logout error", body: error });
    });

});

router.get("/github",
    passport.authenticate("githubLogin", {scope:["user:email"]}),
    (req, res) => {})


router.get("/githubcallback",
    passport.authenticate("githubLogin", {failureRedirect:"/login"}),
    async (req, res) => {
        req.session.user = req.user;
        res.redirect("/profile");
    }
);


export default router;
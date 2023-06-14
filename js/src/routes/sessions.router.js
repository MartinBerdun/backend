import { Router } from "express";
// import userModel from "../dao/models/user.model.js";
// import { isValidPassword, createHash } from "../utils.js";
import passport from "passport";
import { userService } from "../servicies/users.services.js";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken"
import { UserDTO } from "../dao/dtos/user.dto.js";
import config from "../config.js";
import { userRepository } from "../dao/repositories/users.repository.js";

const router = Router();

const {JWT_SECRET} = config;

router.post("/register", passport.authenticate("register", {failureRedirect :"/api/sessions/failRegister"})
,async (req, res) => {
    return res.send({status:"success", message: "Register Success/ user registered"})
})

router.get("/failRegister", (req, res) => {
    res.send({status :"status", error :"Authentication error"})
})

router.post("/login",
    // passport.authenticate("login", {failureRedirect:"/failLogin"}) ,
    async (req, res) => {
        const {email,password}=req.body; //va en controllers
        
        const user = await userRepository.getUserByEmail({email: email});

        if(!user) return res.status(401).send({status: "error", error :"User does not exist"});

        if(!isValidPassword(user, password)) return res.status(401).send({status: "error", error :"Invalid credentials"});
        
        const userDTO = new UserDTO(user);
        const jwtUser = JSON.parse(JSON.stringify(userDTO));

        console.log(jwtUser);

        const token = jwt.sign(jwtUser,JWT_SECRET, {expiresIn: "24h"})


        return res
        .cookie("jwtCookie", token, {httpOnly: true}) //aca creo el token en la cookie
        .send({status:"success", message:"Logged in"})
})

router.get("/current", (req, res) => {
    return res.send({payload: req.user})
})

router.get("/failLogin", (req, res) => {
    res.send({status :"error", error :"Authentication error"})
})

router.get("/logout", (req, res) => {
    
    res.clearCookie("jwtCookie").send({status :"success", message :"Log out success"})
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
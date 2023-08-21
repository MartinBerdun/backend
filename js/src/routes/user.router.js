import { Router } from "express";
import passport from "passport";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken"
import { UserDTO } from "../dao/dtos/user.dto.js";
import config from "../config/config.js";
import { userRepository } from "../dao/repositories/users.repository.js";
import { uploader } from "../utils.js";
import { recoverPassword, updatePassword, changeRole, updateUserDocuments} from "../controllers/users.controller.js";
import { authRole } from "../middlewares/auth.js";

const router = Router();

const {JWT_SECRET, COOKIE_NAME} = config;

router.post("/register", passport.authenticate("register", {failureRedirect :"/api/sessions/failRegister", session:false})
,async (req, res) => {
    return res.send({status:"success", message: "Register Success/ user registered"})
})

router.get("/failRegister", (req, res) => {
    res.send({status :"status", error :"Authentication error"})
})

router.post("/login",
    async (req, res) => {
        const {email,password}=req.body;
        
        const user = await userRepository.getUserByEmail({email: email});

        console.log(user);

        if(!user) return res.status(401).send({status: "error", error :"User does not exist"});

        if(!isValidPassword(user, password)) return res.status(401).send({status: "error", error :"Invalid credentials"});
        
        const userDTO = new UserDTO(user);
        const jwtUser = JSON.parse(JSON.stringify(userDTO));

        const token = jwt.sign(jwtUser,JWT_SECRET, {expiresIn: "24h"})

        return res
        .cookie(COOKIE_NAME, token, {httpOnly: true}) //aca creo el token en la cookie
        .send({status:"success", message:"Logged in"})
})

router.get("/current",passport.authenticate("jwt", { session: false }), (req, res) => {
    
    const jwtUser = req.user;
    console.log({jwtUser});

    const user = new UserDTO(jwtUser);
    console.log({user});
    
    res.render("profile",  {user} );
},
)

router.get("/failLogin", (req, res) => {
    res.send({status :"error", error :"Authentication error"})
})

router.get("/logout", (req, res) => {
    
    res.clearCookie("jwtCookie").send({status :"success", message :"Log out success"})
});

router.get("/github",
    passport.authenticate("githubLogin", {session:false, scope:["user:email"]}),
    (req, res) => {})


router.get("/githubcallback",
    passport.authenticate("githubLogin", {session:false,failureRedirect:"/login"}),
    async (req, res) => {
        req.session.user = req.user;
        res.redirect("/profile");
    }
);

router.post("/premium/:uid",
    passport.authenticate("jwt", { session: false }),
    /* (req, res, next) => authRole(req, res, next, ["admin", "user","premium"]), */ 
    changeRole
);

router.post(
    '/:uid/documents',
    (req, res, next) => authRole(req, res, next, ['user', 'premium']),
    uploader.fields([
      { name: 'identification' },
      { name: 'address' },
      { name: 'statement' }
    ]),
    updateUserDocuments
)


router.post("/restore", recoverPassword);

router.put("/resetPassword", updatePassword);


export default router;
import { Router } from "express";
import passport from "passport";
import { uploader } from "../utils.js";

import {registerUser,failRegister,currentUser, login,logout, recoverPassword, updatePassword, changeRole, updateUserDocuments, getUsers, getUserById, deleteManyUsers, deleteUserById, githubCallback, githubLogin} from "../controllers/users.controller.js";

import { authRole } from "../middlewares/auth.js";

const router = Router();

router.get("/:id", getUserById);

router.get('/', getUsers);

router.delete('/inactive', deleteManyUsers);

router.delete('/:id', deleteUserById);

router.post("/register", passport.authenticate("register", {failureRedirect :"/api/sessions/failRegister", session:false})
,registerUser)

router.get("/failRegister", failRegister)

router.post("/login",login)

router.get("/current",passport.authenticate("jwt", { session: false }), 
(req, res, next) => authRole(req, res, next, ['user', 'premium', 'admin']),
currentUser) 

router.get("/failLogin", (req, res) => {
    res.send({status :"error", error :"Authentication error"})
})

router.get("/logout",logout);

router.get("/github",
    passport.authenticate("github", {session:false, scope:["user:email"]}),
    githubLogin)

router.get("/githubcallback",
    passport.authenticate("github", {session:false,failureRedirect:"/login"}),githubCallback
);

router.post("/premium/:uid",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => authRole(req, res, next, ["admin", "user","premium"]), 
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
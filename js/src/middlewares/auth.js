
// const checkLogin = (req, res, next) => {
//     if (!req.session.user) return res.redirect("/");
//     next();
// }

// const checkLogged = (req, res, next) => {
//     if (req.session.user) return res.redirect("/products");
//     console.log(req.session.user);
//     next();

// }

import jwt from "jsonwebtoken";
import config from "../config.js";

const {JWT_SECRET} = config;

const authRole = (req, res, next, roleToVerify) => {
    // const  role  = "user";
    const {role} = req.session.user;

    console.log({role});

    if (role !== roleToVerify)
        return res.status(403).send({ status: "error", error: "Unauthorized" });

    next();
};
export {   authRole};
/* 
const checkLogin = (req, res, next) => {
    if (!req.session.user) return res.redirect("/");
    next();
}

const checkLogged = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    console.log(req.session.user);
    next();

}
 */

import jwt from "jsonwebtoken";
import config from "../config.js";

const {JWT_SECRET} = config;

const authRole = (req, res, next, roleToVerify) => {

    const token = req.cookies.jwtCookie;
    console.log({token});
  
    if (!token) {
      
      return res.status(401).send({error: "incorrect token from authRole"})
    }
  
    const { role } = jwt.verify(token, JWT_SECRET);
    console.log({role});
  
    if (role !== roleToVerify) {
      
      return res.status(403).send({error: "incorrect prmission from authRole"});
    }
  
    next();
  };
export { authRole};
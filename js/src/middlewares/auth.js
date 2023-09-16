import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {JWT_SECRET} = config;

const authRole = (req, res, next, roleToVerify) => {

    const token = req.cookies.jwtCookie;
    console.log({token});
  
    if (!token) {
      return res.status(401).send({error: "incorrect token from authRole"})
    }
  
    const { role } = jwt.verify(token, JWT_SECRET);
    console.log({role});
  
    if (!roleToVerify.includes(role)) {
      
      return res.status(403).send({error: "incorrect permission from authRole"});
    }
  
    next();
  };
  
export {authRole};

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
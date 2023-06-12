import CustomRouter from "./class.router.js";
import jwt from "jsonwebtoken";

export default class SessionsRouter extends CustomRouter {
init () {
    this.post("/login", ["public"], (req,res)=> {
        let user = {
            email:req.body.email,
            role :"user",
        }

        let token = jwt.sign(user, "CoderSecret")
        res.sendSuccess({token})
    })
 }
}



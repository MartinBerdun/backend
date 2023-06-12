import { Router } from "express";
// import jwt  from "jsonwebtoken";
import jwt from "jsonwebtoken"

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {};

    getRouter() {
        return this.router;
    }

    get(path, policies ,...callback) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callback))
    }

    post(path, policies, ...callback) {
        this.router.post(
        path,
        this.handlePolicies(policies),
        this.generateCustomResponses,
        this.applyCallbacks(callback)
        );
    }

    generateCustomResponses(req, res, next) {

        res.sendSuccess = (payload) => res.send({status:"success", payload});
        res.sendserverError = (err) => res.status(500).send({status:"error", err});
        res.sendUserError = (err) => res.status(400).send({status:"error",err});

        next();
    }

    handlePolicies = (policies) => (req,res,next) =>{
        if(policies[0] === "public") return next();

        const authHeaders = req.headers.authorization;
        if(!authHeaders) return res.status(401).send({status:"error",err:"unauthorized"});

        const token = authHeaders.split(" ")[1];
        let user = jwt.verify(token,"CoderSecret")

        if(!policies.includes(user.role))
            return res.status(403).send({status:"error"});

        console.log(user.role);

        req.user = user;
        next();
    }

    applyCallbacks(callbacks) { // nos permite pasar los callbasck como parmetros en otra funcion 
        return callbacks.map((callback) => async (...params)=> {
            try {
                await callback.apply(this,params);
            } catch (error) {
                console.log(error);
                
                params[1].status(500).send(error);
            }
        });

    }

}
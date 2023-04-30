import { Router } from "express";
import userModel from "../dao/models/user.model.js"

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body;

        const userExists = await userModel.findOne({email});
        if (userExists){
            return res
            .status(400)
            .send({status:"error", error:"user already exists"})
        }

        const user = {
            first_name, last_name, email, age, password
        };
        await userModel.create(user);
        return res.send({status:"success", message :"user registered"})

    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                name: `adminCoder`,
                email: email,
                age: "(not required)",
                rol: "admin"
            }
        } else {
            const user = await userModel.findOne({email, password});
            if(!user) {
                return res
                    .status(400)
                    .send({status: "error", error: "Usuario no encontrado."});
            }

            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "user",
            }
        }

        return res.send({status:"success", message:"Logged in", payload : req.session.user})

    } catch (error) {
        console.log(error);
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (!error) return res.send("Logout successful!");

        return res.send({ status: "error", message: "Logout error", body: error });
    });

});

export default router;
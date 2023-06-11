import { userService } from "../servicies/users.services.js";

export const getUsers = async (req,res) => {
    try {
        const users = await userService.getUsers();
        if(!users){
            return res.status(404).send({error: "carts not found"})
        }

        return res.status(200).send({status: "success", payload : users })
    } catch (error) {
        throw new Error(error);
    }
}

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        req.session.user = {
            name: `${result.first_name} ${result.last_name}`,
            email: result.email,
            age: result.age,
            rol: result.role,
            cart: result.cart
        };

        const userLogged = await userService.login(email, password); 

        if (!email || !password) {
            return res.status(400).send({
                status: "error",
                error: "Incomplete values",
            });
        }

        if(!userLogged) {
            return res.status(401).send({status: "error", error: "user not logged in"});
        }

        return res.status(200).send({status: "success", payload : userLogged })

    } catch (error) {
        throw new Error(error);
    }

}

export const registerUser = async (req, res) => {
    try {
        return res
        .status(201)
        .send({ status: "success", message: "User registered" });
    } catch (error) {
        console.log(`Failed to register user: ${error}`);
        return res
        .status(404)
        .send({ status: "error", error: "Failed to register user" });
    }
  };

export const failRegister = async (req, res) => {
    return res
      .status(409)
      .send({ status: "error", message: "User already exists" });
};
import CustomRouter from "./class.router.js";

export default class UsersRouter extends CustomRouter { //se crea una clase Usersrouter  y quiero que tenga acceso a los metodos de CustomRouter, extends es un concepto/principio relacionada a pov llamado herencia.

    init() {
        this.get("/", ["public"], (req,res) =>{
            return res.sendSuccess("Hola, coders")
        })

        this.get("/currentUser", ["user", "user_premium"], (req, res) => {
            res.sendSuccess(req.user);
        });
    }
}




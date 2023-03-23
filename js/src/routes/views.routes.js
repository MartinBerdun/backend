import {Router}  from "express";

const router = Router()

router.get ("/", (req, res) =>{ //para que se renderize en el servidor
    res.render("index",  {
        user: testUser,
        style: "index.css",
    });
    
    
    //se renderiza el archivo llamado index y las variables se reemplazan usando el objeto testuser
})

let testUser = {
    name: "Martin"
} 

export default router;
import express from "express";
const app = express();
app.use(express.urlencoded({extended:true}))
import ProductManager from "../src/productManager.js";
const manager = new ProductManager ();

app.get("/products", async (req, res) => {
    const productos = await manager.getProducts();
    let limit = req.query.limit;
    if (!limit || limit > productos.length){
        // console.log("No se introdujo query o Cantidad de productos no disponible");
        return res.send(productos);
    } 
    let productsplice = productos.splice(0,limit);
    // console.log(limit);
    // console.log(productsplice);
    res.send({productos : productsplice})
});

app.get ("/products/:pid" , async (req,res) =>{
    const productos = await manager.getProducts();
    let idProduct = req.params.pid;
    const product = productos.find((prod) => prod.id == idProduct)
    if(!product) return res.send({error: "producto no encontrado"});
    res.send({product})
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
});



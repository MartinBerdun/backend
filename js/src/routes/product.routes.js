import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const manager = new ProductManager();
// const products = await manager.consultProducts();

//GET PRODUCTS
router.get ("/", async (req, res)=>{
    const productos = await manager.getProducts();
    let limit = req.query.limit;
    if (!limit || limit > productos.length){
        return res.send(productos);
    } 
    let productsplice = productos.splice(0,limit);
    res.send({productos : productsplice})
})

//GET BY ID
router.get ("/:pid", async (req,res) => {
    const products = await manager.getProducts();
    let idProduct = req.params.pid;
    const product = products.find((prod) => prod.id == idProduct)
    if(!product) return res.status(404).send({ status: "Error", message: "Product not found" });
    res.send({product})
})

//ADD A NEW PRODUCT
router.post ("/", async (req,res) =>{
    const products = await manager.getProducts();

    const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        status: req.body.status,
        code: req.body.code,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails,
    };

    if(products.length === 0){
        product.id = 1;
    } else {
        product.id = products[products.length -1].id + 1; 
    }
    
    products.push (product);
    res.send(products)
    return res.status(200).send({ status: "Success", message: "Product created" })

})

//UPDATE PRODUCT
router.put ("/:pid", async (res, req) => {
    const products = await manager.getProducts();
    let idProduct = req.params.pid;
    console.log(id);
    const product = products.find((p) => p.id === idProduct);

    if(!product) {
        return res
            .status(400)
            .send({status: `Error`, error: `No se encontró el producto`});
    }

    const productUpdated = {
        id: product.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        status: req.body.status,
        code: req.body.code,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails
    };

    for(let i = 0 ; i < products.length; i++){
        if(products[i].id === id){
            products[i] = productUpdated;
        }
    }
    res.send({products})

})

//DELETE PRODUCT
router.delete ("/:pid", async (res,req) => {
    const products = await manager.getProducts();
    let idProduct = req.params.pid;
    console.log(products);
    console.log({idProduct});
    
    const newProducts=  products.filter ((product) => product.id !== idProduct);
    res.send(newProducts)


})

export default router;

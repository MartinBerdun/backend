import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const manager = new ProductManager();

//GET PRODUCTS
router.get ("/", async (req, res)=>{
    const products = await manager.consultProducts();
    let limit = req.query.limit;

    if (!products){
        return res.status(404).send({
        status: "error",
        message: { error: `No products found` },
    })}

    if (!limit || limit > products.length){
        return res.status(200).send({status:"Success", message:products});
    } 
    
    let productsplice = products.splice(0,limit);
    return res.status(200).send({status:"Success",products : productsplice})

})

//GET PRODUCT BY ID 
router.get ("/:pid", async (req,res) => {
    let idProduct = req.params.pid;
    const product = await manager.getProductById(idProduct)

    if(!product) return res.status(404).send({ status: "Error", error: `Product with ID ${idProduct} was not found` });

    return res.status(200).send({status:"Success",products: product})
})

//ADD A NEW PRODUCT 
router.post ("/", async (req,res) =>{
    // const products = await manager.getProducts();

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
    
    const products = await manager.consultProducts()
    const productIndex = await products.findIndex((prod) => prod.code === product.code);

    if (productIndex !== -1) {
        return res.status(400).send({
        status: "error",
        message: { error: `Product with code ${product.code} already exists` },
        });
    }


    const addProduct = await manager.addProduct(product)

    if(!addProduct) return res.status(404).send({ status: "Error", message: "Product not added" });

    return res.status(201).send({ status: "Success", message:{success: "Product added succesfully", product}})
})

//UPDATE PRODUCT 
router.put ("/:pid", async (req,res) => {
    let idProduct = req.params.pid;
    let productUpdated = req.body;
    const product = await manager.updateProduct(idProduct, productUpdated)

    if(!product)return res.status(404).send({ status: "Error", message: "Product was not updated" });

    return res.status(200).send({ status: "Success", message: {success: "Product updated succesfully",idProduct, productUpdated,product} })
})

//DELETE PRODUCT 
router.delete ("/:pid", async (req,res) => {
    let idProduct = req.params.pid;
    const deletedProduct = await manager.deleteProduct(idProduct);
    const products = await manager.getProducts();

    if(!deletedProduct) return res.status(404).send({ status: "Error", message: "Product not deleted" });

    return res.status(200).send({ status: "Success", message: {success: "Product deleted succesfully", idProduct,products}})
})

export default router;

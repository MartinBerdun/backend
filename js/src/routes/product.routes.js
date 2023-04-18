import { Router } from "express";
// import ProductManager from "../dao/filesManager/productManager.js";
// import { uploader } from "../utils.js";
import ProductManagerDb from "../dao/dbManagers/productsManagerDb.js";

const router = Router();
const manager = new ProductManagerDb();

//GET PRODUCTS

//ACA EN GET ES DONDE TENGO QUE PONER EL PAGINATE

router.get ("/", async (req, res)=>{ //siempre que use mongo debe ser una funcion async porque es un tercer
    try {
        const {
            limit = 10,
            page = 1,
            category = null,
            status = null,
            sort = null
        } = req.query;

        const products = await manager.getProducts(
            limit,
            page,
            category,
            status,
            sort
        );
        return res.send({status:"ok", payload: products})
    // let limit = req.query.limit;

    // if (!products){
    //     return res.status(404).send({
    //     status: "error",
    //     message: { error: `No products found` },
    // })}

    // if (!limit || limit > products.length){
    //     return res.status(200).send({status:"Success", message:{ error: `No limit found`, products}});
    // } 

    
    // let productsplice = products.splice(0,limit);
    // return res.status(200).send({status:"Success",products : productsplice})
    } catch (error) {
        console.log(error);
    }

})

// GET PRODUCT BY ID 
router.get ("/:pid", async (req,res) => {
    // try {
    //     const {pid} = req.params;
    //     const product = await manager.findById({_id:pid});
    //     return res.send({status:"success", payload: product})
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        let {pid} = req.params;
        const product = await manager.getProductById({_id:pid})

        if(!product) return res.status(404).send({ status: "Error", error: `Product with ID ${pid} was not found` });

        return res.status(200).send({status:"Success",products: product})
    } catch (error) {
        console.log(error);
    }
})

//ADD A NEW PRODUCT 
router.post ("/", async (req,res) =>{

    // try {
    // const product = req.body;
    // const productCreated = await manager.create(product);
    // return res.send({status:"success", payload:productCreated})
    // } catch (error) {
    //     console.log(error);
    // }

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
    
    // const products = await manager.consultProducts()
    const productIndex = products.findIndex((prod) => prod.code === product.code);

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

    // try {
    //     const {pid} = req.params;
    //     const productUpdated = req.body;
    //     const update = await manager.update({_id:pid}, productUpdated)
    //     return res.send({status:"success", payload: update})
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const {pid} = req.params;
        let productUpdated = req.body;
        const product = await manager.updateProduct({_id:pid}, productUpdated)

        if(!product)return res.status(404).send({ status: "Error", message: "Product was not updated" });

        return res.status(200).send({ status: "Success", message: {success: "Product updated succesfully",pid, productUpdated,product} })
    } catch (error) {
    console.log(error);
    }
})

//DELETE PRODUCT 
router.delete ("/:pid", async (req,res) => {
    // try {
    //     const {pid} = req.params;
    //     const product = await manager.delete({_id : pid})
    //     return res.send({status:"success", payload: product})
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const {pid} = req.params;
    const deletedProduct = await manager.deleteProduct({_id:pid});
    const products = await manager.getProducts();

    if(!deletedProduct) return res.status(404).send({ status: "Error", message: "Product not deleted" });

    return res.status(200).send({ status: "Success", message: {success: "Product deleted succesfully",products}})
    } catch (error) {
        console.log(error);
    }
})

export default router;

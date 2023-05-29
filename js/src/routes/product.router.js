import { Router } from "express";
import { getProducts, addProduct,getProductById,updateProduct, deleteProduct } from "../controllers/products.controller.js";


const router = Router();

router.get ("/", getProducts);
router.get ("/:pid", getProductById);
router.post ("/", addProduct);
router.put ("/:pid", updateProduct);
router.delete ("/:pid",deleteProduct);

export default router;





//GET PRODUCTS

// router.get ("/", async (req, res)=>{ 
//     try {
//         const {
//             limit = 10,
//             page = 1,
//             category = null,
//             status = null,
//             sort = null
//         } = req.query;

        

//         const products = await manager.getProducts(
//             limit,
//             page,
//             category,
//             status,
//             sort,
//         );

//         if (isNaN(limit)) {
//             return res.status(400).send({
//                 status: "error",
//                 error: `Limit ${limit} is not valid`,
//             });
//         }

//         if (isNaN(page)) {
//             return res.status(400).send({
//                 status: "error",
//                 error: `Page ${page} is not a valid value`,
//             });
//         }

//         if (!products)
//         return res.status(404).send({
//         status: "error",
//         error: `No products found`,
//         });



//         return res.status(200).send({status:"ok", payload: products})
//     } catch (error) {
//         console.log(error);
//     }

// })

// GET PRODUCT BY ID 
// router.get ("/:pid", async (req,res) => {
//     try {
//         let {pid} = req.params;
//         const product = await manager.getProductById(pid)

//         if(!product) return res.status(404).send({ status: "Error", error: `Product with ID ${pid} was not found` });

//         return res.status(200).send({status:"Success",payload: product})
//     } catch (error) {
//         console.log(error);
//     }
// })

//ADD A NEW PRODUCT 
// router.post ("/", async (req,res) =>{

//     const product = {
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price,
//         status: req.body.status,
//         code: req.body.code,
//         stock: req.body.stock,
//         category: req.body.category,
//         thumbnails: req.body.thumbnails,
//     };
    
//     const products = await manager.consultProducts()
//     const productIndex = products.findIndex((prod) => prod.code === product.code);

//     if (productIndex !== -1) {
//         return res.status(400).send({
//         status: "error",
//         message: { error: `Product with code ${product.code} already exists` },
//         });
//     }

//     const addProduct = await manager.addProduct(product)

//     if(!addProduct) return res.status(404).send({ status: "Error", message: "Product not added" });

//     return res.status(201).send({ status: "Success", message:{success: "Product added succesfully", product}})
// })

//UPDATE PRODUCT 
// router.put ("/:pid", async (req,res) => {

//     try {
//         const {pid} = req.params;
//         let productUpdated = req.body;
//         const product = await manager.updateProduct({_id:pid}, productUpdated)

//         if(!product)return res.status(404).send({ status: "Error", message: "Product was not updated" });

//         return res.status(200).send({ status: "Success", message: {success: "Product updated succesfully",pid, productUpdated,product} })

//     } catch (error) {
//     console.log(error);
//     }
// })

//DELETE PRODUCT 
// router.delete ("/:pid", async (req,res) => {

//     try {
//         const {pid} = req.params;
//     const deletedProduct = await manager.deleteProduct({_id:pid});
//     const products = await manager.getProducts();

//     if(!deletedProduct) return res.status(404).send({ status: "Error", message: `Product with ${pid} not found ` });

//     return res.status(200).send({ status: "Success", message: {success: "Product deleted succesfully",products}})

//     } catch (error) {
//         console.log(error);
//     }
// })



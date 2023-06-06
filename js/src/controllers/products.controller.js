import { productService } from "../servicies/products.services.js";

export const getProducts = async (req,res) => {
    try {

        const {
            limit = 10,
            page = 1,
            category = null,
            status = null,
            sort = null
        } = req.query;

        const products = await productService.getProducts(
            limit,
            page,
            category,
            status,
            sort,
        );

        if (isNaN(limit)) {
            return res.status(400).send({
                status: "error",
                error: `Limit ${limit} is not valid`,
            });
        }

        if (isNaN(page)) {
            return res.status(400).send({
                status: "error",
                error: `Page ${page} is not a valid value`,
            });
        }

        if (!products)
        return res.status(404).send({
        status: "error",
        error: `No products found`,
        });

        return res.status(200).send({status:"ok", payload: products})
        
    } catch (error) {
        console.log(`Failed to get products at controller ${error}`);
        
        return res
            .status(404)
            .send({ status: "error", error: "Products not created or found" });
    }
}

export const addProduct = async (req, res) => {
    try {

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
        
        const products = await productService.consultProducts()
        console.log({products});
        const productIndex = products.findIndex((prod) => prod.code === product.code);
    
        if (productIndex !== -1) {
            return res.status(400).send({
            status: "error",
            message: { error: `Product with code ${product.code} already exists` },
            });
        }
    
        const addProduct = await productService.addProduct(product)
    
        if(!addProduct) return res.status(404).send({ status: "Error", message: "Product not added" });
    
        return res.status(201).send({ status: "Success", message:{success: "Product added succesfully", product}})

        // const {product} = req.body;

        // if(!product) {return res.status(404).send({ status: "error", error: "invalid values from req.body at addProduct" })
        // }

        // const productAdded = await productService.addProduct(product);

        // if(!productAdded) {return res.status(404).send({ status: "error", error: "product not added" })
        // }

        // return res.status(200).send({ status: "success", payload: productAdded})

    } catch (error) {
        console.log(`Failed to add product ${error}`);
        return res
            .status(404)
            .send({ status: "error", error: "Product not created or added" });
    }
}

export const getProductById = async (req, res) => {
    try {

        const {pid} = req.params;
        
        if(!pid) {return res.status(404).send({ status: "error", error: "pid not valid" })
        }

        const product = await productService.getProductById(pid);

        if(!product) {return res.status(404).send({ status: "error", error: "product not found" })
        }

        return res.status(200).send({ status: "success", payload: product})
        
    } catch (error) {
        console.log(`Failed to found product by Id ${error}`);
        return res
            .status(404)
            .send({ status: "error", error: "Product not found by Id" });
    }
}

export const updateProduct = async (req, res) => {
    try {

        const {pid} = req.params;
        const product = req.body;

        if(!pid || !product) { return res.status(404).send({status :"error", error: "invalid values"});
        }

        console.log({pid});

        const updatedProduct = await productService.updateProduct(pid, product);

        if(!updatedProduct) {
            return res.status(404).send({status:"error", error: "Product not updated" });
        }

        return res.status(200).send({status:"success", payload: updatedProduct})
        
    } catch (error) {
        console.log(`Failed to update product ${error}`);
        return res
            .status(404)
            .send({ status: "error", error: "Product not updated" });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const {pid}= req.params;

        if(!pid) { return res.status(404).send({status :"error", error: "invalid values"});
        }

        const deletedProduct = await productService.deleteProduct(pid);

        if(!deletedProduct) { return res.status(404).send({status :"error", error:"product not deleted"});
        }

        return res.status(200).send({status: "success",payload: deletedProduct});

        
    } catch (error) {
        console.log(`Failed to found product by Id ${error}`);
        return res
            .status(404)
            .send({ status: "error", error: "Product not updated" });
    }
}


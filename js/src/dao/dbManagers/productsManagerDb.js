import { productModel } from "../models/products.model.js";

export default class ProductManagerDb {

    constructor(){};

    getProducts = async (limit,page,category,status,sort) =>{
        try{

            let queries = {};
            parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
            const products = await productModel.paginate(queries, {
                limit,
                page,
                category,
                status,
                sort,
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }


    addProduct = async (product) =>{
        try {
            const productCreated = await productModel.create(product)
            return productCreated;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {
            const productFinded = await productModel.findById(id)
            return productFinded;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) =>{
        try {
            const productUpdated = await productModel.updateOne(id, product);
            return productUpdated;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {
            const productDeleted = await productModel.deleteOne(id);
            return productDeleted;
        } catch (error) {
            console.log(error);
        }
    }

}
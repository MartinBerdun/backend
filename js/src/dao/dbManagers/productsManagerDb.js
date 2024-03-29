import { productModel } from "../models/products.model.js";

export default class ProductManagerDb {

    constructor(){};

    getProducts = async (limit,page,category,status,sort) =>{
        try{
            let queries = {};
            category ? (queries.category = category) : null;
            status ? (queries.status = status) : null;

            parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
            const products = await productModel.paginate(queries, {
                limit,
                page,
                lean : true,
                sort,
            });

        products.hasPrevPage ? (products.prevLink = `/?page=${products.prevPage}`) : (products.prevLink = null);
        products.hasNextPage ? (products.nextLink = `/?page=${products.nextPage}`) : (products.nextLink = null);

            return products;

        } catch (error) {
            console.log(error);
        }
    }

    consultProducts = async() =>{
        try {
            const products = await productModel.find();
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

            const productFinded = await productModel.findOne({_id:id}).lean()
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
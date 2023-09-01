import { productModel } from "../models/products.model.js";

class ProductsRepository {
    constructor(){
        this.model= productModel;
    }

    getProducts = async (limit,page,category,status,sort) =>{
        try{
            let queries = {};
            category ? (queries.category = category) : null;
            status ? (queries.status = status) : null;

            parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
            const products = await this.model.paginate(queries, {
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
            const products = await this.model.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) =>{
        try {

            const productCreated = await this.model.create(product)
            return productCreated;

        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {

            const productFinded = await this.model.findOne({_id:id}).lean()
            return productFinded;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) =>{
        try {

            const productUpdated = await this.model.updateOne({_id:id}, product);
            return productUpdated;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {

            const productDeleted = await this.model.deleteOne({_id:id});
            return productDeleted;
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteManyProducts = async (limit) => {
    try {
        
        const products = await this.model.deleteMany(limit);
        return products;
    } catch (error) {
        console.log(error);
    }
    }
}

export const productRepository = new ProductsRepository();
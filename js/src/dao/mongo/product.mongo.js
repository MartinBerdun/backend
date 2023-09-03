import  {productModel}  from "./models/products.model.js";

class Product {
    constructor(){
    }

    getProducts = async (limit,page,category,status,sort) =>{
        try{
            let queries = {};
            category ? (queries.category = category) : null;
            status ? (queries.status = status) : null;

            parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            parseInt(sort) === -1 ? (sort = { price: -1 }) : null;

            const options = {
                limit:10,
                page,
                sort,
                lean : true,
            }

            const products = await productModel.paginate(queries, options);

            products.hasPrevPage ? (products.prevLink = `/?page=${products.prevPage}`) : (products.prevLink = null);
            products.hasNextPage ? (products.nextLink = `/?page=${products.nextPage}`) : (products.nextLink = null);
        
            console.log({products: products});

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

            const productUpdated = await productModel.updateOne({_id:id}, product);
            return productUpdated;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {

            const productDeleted = await productModel.deleteOne({_id:id});
            return productDeleted;
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteManyProducts = async (limit) => {
    try {
        
        const products = await productModel.deleteMany(limit);
        return products;
    } catch (error) {
        console.log(error);
    }
    }
}

export const product = new Product();
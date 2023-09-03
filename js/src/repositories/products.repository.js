export default class ProductsRepository {
    constructor(dao){
        this.dao= dao;
    }

    getProducts = async (limit,page,category,status,sort) =>{
        try{
            const products = await this.dao.getProducts( {
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

    consultProducts = async() =>{
        try {
            const products = await this.dao.consultProducts();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) =>{
        try {

            const productCreated = await this.dao.addProduct(product)
            return productCreated;

        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {

            const productFinded = await this.dao.getProductById(id);
            return productFinded;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) =>{
        try {

            const productUpdated = await this.dao.updateProduct(id, product);
            return productUpdated;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {

            const productDeleted = await this.dao.deleteProduct(id)
            return productDeleted;
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteManyProducts = async (limit) => {
    try {
        
        const products = await this.dao.deleteManyProducts(limit);
        return products;
    } catch (error) {
        console.log(error);
    }
    }
}


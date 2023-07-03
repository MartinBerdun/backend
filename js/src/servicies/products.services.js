import { productRepository } from "../dao/repositories/products.repository.js";

class ProductService {
    constructor() {}


    async getProducts (limit, page, category, status, sort) {
        try {

            const products = await productRepository.getProducts(
                limit,
                page,
                category,
                status,
                sort
            );

            if (!products) return console.log("products not found at service");

            return products;

        } catch (error) {
            console.log(error);
        }
    }

    async consultProducts() {
        try {
            const products = await productRepository.consultProducts();
            if (!products) return console.log("products not found");
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct (title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails) {
        try {

            const productcdded = await productRepository.addProduct(title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails);

            if(!productcdded) return console.log("product not added at service")

            return productcdded;

        } catch (error) {
            console.log(error);
        }
    }

    async getProductById (pid) {
        try {

            const product = await productRepository.getProductById(pid);
            if(!product) return console.log("product not found")

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, product) {
        try {

            const productUpdated = await productRepository.updateProduct(id, product);
            if(!productUpdated) return console.log("product not updated");
            
            return product;
        
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {

            const product = await productRepository.deleteProduct(id);
            if(!product) return console.log("product not deleted");

            return product;

        } catch (error) {
            console.log(error);
        }
    }
}

export const productService = new ProductService();
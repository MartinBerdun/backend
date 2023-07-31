import { productRepository } from "../dao/repositories/products.repository.js";

class ProductService {
    constructor() {}

    //VER PARTE DE LA CLASE A LOS 58 MINUTOS DONDE DICE QUE LAS VALIDACIONES DE LOS IF VAN SOLAMENTE EN EL CONTROLLER Y NO EN EL SERVICE 


    async getProducts (limit, page, category, status, sort) {
        try {

            const products = await productRepository.getProducts(
                limit,
                page,
                category,
                status,
                sort
            );
            
            return products;

        } catch (error) {
            console.log(error);
        }
    }

    async consultProducts() {
        try {
            const products = await productRepository.consultProducts();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct (title,description,price,code, status,stock,category,thumbnails) {
        try { 
            const productadded = await productRepository.addProduct(title,
                description,
                price,
                status,
                code,
                stock,
                category,
                thumbnails,
                owner = "admin");

                const { role, email } = jwt.verify(token, JWT_SECRET, {
                    ignoreExpiration: true,
                  });
                  role === "premium" ? (productadded.owner = email) : null;

            return productadded;

        } catch (error) {
            console.log(error);
        }
    }


    async getProductById (pid) {
        try {

            const product = await productRepository.getProductById(pid);
            
            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, product) {
        try {

            const productUpdated = await productRepository.updateProduct(id, product);
            
            return productUpdated;
        
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id, token) {
        try {

            const { role, email } = jwt.verify(token, JWT_SECRET, {
                ignoreExpiration: true,
              });
              const { owner } = await productRepository.getProductById(id);
              
              if (role === "premium" && email !== owner) {
                throw new Error("You can only delete products you own");
              }

            const product = await productRepository.deleteProduct(id);
            
            return product;

        } catch (error) {
            console.log(error);
        }
    }
}

export const productService = new ProductService();
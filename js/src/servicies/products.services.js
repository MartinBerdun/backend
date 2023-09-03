import { productRepository } from "../repositories/index.js";

import config from "../config/config.js";

import jwt  from "jsonwebtoken";

const {JWT_SECRET, EMAIL_USER}= config;

import { transport } from "../transport.js";

export default class ProductService {
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

    async addProduct (title,description,price,code,stock,category,thumbnails,token) {
        try { 
            
            const product = {
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails,
                owner: 'admin'
            }

            const { role, email } = jwt.verify(token, JWT_SECRET, {
                ignoreExpiration: true,
              }); 
        
            role === "premium" ? (product.owner = email) : null; 
            
            const productadded = await productRepository.addProduct(product);
            
            if(!productadded) throw new Error ("error at adding new product at controllers")

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

              const { owner, title  } = await productRepository.getProductById(id);
              
              if (role === "premium" && email !== owner) {
                throw new Error("You can only delete products you own");
              }

            const deletedProduct = await productRepository.deleteProduct(id);

            if (!deletedProduct) {
                throw new Error(`Error deleting product with id: ${id}`)
              }

            const sentEmail = await transport.sendMail({
                from: `${EMAIL_USER}`,
                to: owner,
                subject: `You have deleted this product ${title}!`,
                attachments: [],
            });
            return sentEmail;
            
            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteManyProducts(limit) {
        try {
            const limit = 50;

            const products = await productRepository.deleteManyProducts({}, {limit})

            return products;


        } catch (error) {
            console.log(error);
        }
    }
}
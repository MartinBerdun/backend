import { cartRepository } from "../repositories/index.js";

import { productRepository } from "../repositories/index.js";

import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {JWT_SECRET} = config;

export default class CartService {
    constructor() {}

    async getCarts() {
        try {

            const getAllCarts = await cartRepository.getCarts();
            if(!getAllCarts) return console.log("No carts found");

            return getAllCarts;

        } catch (error) {
            console.log(error);
        }
    }


    async createCart(){
        try {

            const newCart = await cartRepository.createCart();
            if(!newCart) return console.log("Cart not created");

            return newCart;

        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(cid){
        try {

            const cartById = await cartRepository.getCartById(cid);
            
            if(!cartById) return console.log("Cart not found at service");
            
            return cartById;

        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cartId, productId, quantity, token) {
        try {

            const { email } = jwt.verify(token, JWT_SECRET, {ignoreExpiration: true,});
            
              const { owner } = await productRepository.getProductById(productId);

              if (email === owner) {
                throw new Error("You can't add your own products");
              }

            const product = await cartRepository.addProduct(cartId, productId, quantity);

            if (!product) return console.log("Product not added seccessfully");

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(cartId, products){
        try {

            const product = await cartRepository.updateCart(cartId, products);

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantityInCart(cartId, prodId, quantity){
        try {

            const cart = await cartRepository.updateQuantityInCart(cartId, prodId, quantity);

            if (!cart) return console.log("Quantity not updated");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart( cartId, prodId) {
        try {

            const cart = await cartRepository.deleteProductFromCart(cartId, prodId);

            if(!cart) return console.log("Product not deleted from cart");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart (cid) {
        try {

            const cart = await cartRepository.deleteCart(cid);

            if (!cart) return console.log("Cart not deleted");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

}
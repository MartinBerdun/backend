import { cartsRepository } from "../dao/repositories/carts.repository.js";

class CartService {
    constructor() {}

    async getCarts() {
        try {

            const getAllCarts = await cartsRepository.getCarts();
            if(!getAllCarts) return console.log("No carts found");

            return getAllCarts;

        } catch (error) {
            console.log(error);
        }
    }


    async createCart(){
        try {

            const newCart = await cartsRepository.createCart();
            if(!newCart) return console.log("Cart not created");

            return newCart;

        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(cid){
        try {

            const cartById = await cartsRepository.getCartById(cid);
            
            if(!cartById) return console.log("Cart not found at service");
            
            return cartById;

        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cartId, productId, quantity) {
        try {

            const product = await cartsRepository.addProduct(cartId, productId, quantity);
            if (!product) return console.log("Product not added");

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(cartId, products){
        try {

            const product = await cartsRepository.updateCart(cartId, products);

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantityInCart(cartId, prodId, quantity){
        try {

            const cart = await cartsRepository.updateQuantityInCart(cartId, prodId, quantity);

            if (!cart) return console.log("Quantity not updated");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart( cartId, prodId) {
        try {

            const cart = await cartsRepository.deleteProductFromCart(cartId, prodId);

            if(!cart) return console.log("Product not deleted from cart");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart (cid) {
        try {

            const cart = await cartsRepository.deleteCart(cid);

            if (!cart) return console.log("Cart not deleted");

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

}

export const cartService = new CartService();
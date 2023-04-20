import { cartModel } from "../models/carts.model.js";

export default class CartManagerDb{
    constructor(){};


    getCarts = async () =>{
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }

    createCart = async () => {
        try {
            const newCart = await cartModel.create({
            products: [],
            })
            return newCart;
        }catch (error) {
        console.log(error);
        }
    };

    getCartById =async (id) =>{
        try {
            const cartById = await cartModel.findOne({_id:id}).populate("products.product")
            return cartById;
        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (cartId, prodId) =>{
        try {
            const cart = await cartModel.updateOne(
                {_id : cartId},
                {products:prodId}
                )
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    updateQuantityInCart = async (cartId,prodId, quantity) =>{
        try {
            const updateQuantity = await cartModel.updateOne(
            {_id:cartId, "products.product" : prodId},
            {"products.quantity":quantity}
            )
            return updateQuantity;
        } catch (error) {
            console.log(error);
        }
    }



    addProduct = async (cartId, prodId, quantity) =>{
        try {
            const updateCart= await cartModel.updateOne(
                { _id: cartId },
            {$push: { products: [{ product: prodId, quantity }] }}
            )
            return updateCart;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductFromCart = async (cartId, prodId) =>{
        try {
            const productDeleted = await cartModel.updateOne(
                {_id : cartId},
                {$pull:{products: { product:prodId }}}
                )

            return productDeleted;
        } catch (error) {
            console.log(`Cannot delete cart with mongoose ${error}`)
        }
    };

    deleteCart = async (cartId) => {
        try {
            const deletedCart = await cartModel.deleteOne({ _id: cartId });
            return deletedCart;
        } catch (error) {
            console.log(error);
        }
    };















}
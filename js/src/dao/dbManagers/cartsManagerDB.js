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

    // createCart = async (cart) =>{
    //     try {
    //     const cartCreated = await cartModel.create(cart);
    //     return cartCreated;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    getCartById =async (id) =>{
        try {
            const cartById = await cartModel.findOne({_id:id}).populate("products.product")
            return cartById;
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


}
import cartModel from "../models/carts.model.js";

class CartsRepository {
    constructor(){
        this.model = cartModel;
    }

    getCarts = async () =>{
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }

    createCart = async () => {
        try {
            const newCart = await this.model.create({
            products: [],
            })
            return newCart;
        }catch (error) {
        console.log(error);
        }
    };

    getCartById =async (id) =>{
        try {
            const cartById = await this.model.findOne({_id:id}).lean();
            return cartById;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (cartId, prodId, quantity) =>{
        try {

            const qty = quantity;
            const cart = await this.model.findOne({_id:cartId})

            if(!cart){
                return { error: `No se encontró el carrito con id ${cartId}.` }
            }

            const productInCart = cart.products.findIndex((product) => product.product._id.toString() === prodId);

            if(productInCart !== -1){
                cart.products[productInCart].quantity += qty;
            }else {
                await this.model.updateOne(
                    { _id: cartId },
                    {$push: { products: [{ product: prodId, quantity }] }}
                    )
            }

            const updatedCart = await cart.save();
            return updatedCart;

        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (cartId, products) =>{
        try {
            const cart = await this.model.updateOne(
                {_id : cartId},
                {$set:{products:[products]}},
                // {upsert:true}
                )
            // const cart = await cartModel.replaceOne(
            //     {_id:cartId},
            //     { "products":products }
            // )
                return cart;

            // const updatedCart = await cart.save();
            // return updatedCart;
            
        } catch (error) {
            console.log(error);
        }
    }

    updateQuantityInCart = async (cartId,prodId, quantity) =>{
        try {

            const cart = await this.model.updateOne(
                {_id:cartId, "products.product":prodId},
                {$set:{"products.$.quantity":quantity}}
            )

            if(!cart){
                return { error: ` Cannot update quantity in cart ${cartId}.` }
            }

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProductFromCart = async (cartId, prodId) =>{
        try {

            const productDeleted = await this.model.updateOne(
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

            const deletedCart = await this.model.deleteOne({ _id: cartId });
            return deletedCart;
            
        } catch (error) {
            console.log(error);
        }
    };

}

export const cartsRepository = new CartsRepository();
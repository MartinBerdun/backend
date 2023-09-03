export default class CartsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getCarts = async () =>{
        try {
            const carts = await this.dao.getCarts();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }

    createCart = async () => {
        try {
            const newCart = await this.dao.createCart()
            return newCart;
        }catch (error) {
        console.log(error);
        }
    };

    getCartById =async (id) =>{
        try {
            const cartById = await this.dao.getCartById(id);
            return cartById;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (cartId, prodId, quantity) =>{
        try {
            const result = await this.dao.addProduct(cartId, prodId, quantity)
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (cartId, products) =>{
        try {
            const cart = await this.dao.updateCart(cartId, products);
            return cart;
            
        } catch (error) {
            console.log(error);
        }
    }

    updateQuantityInCart = async (cartId,prodId, quantity) =>{
        try {

            const cart = await this.dao.updateQuantityInCart(cartId,prodId,quantity);

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProductFromCart = async (cartId, prodId) =>{
        try {

            const productDeleted = await this.dao.deleteProductFromCart(cartId, prodId)

            return productDeleted;

        } catch (error) {
            console.log(`Cannot delete cart with mongoose ${error}`)
        }
    };

    deleteCart = async (cartId) => {
        try {

            const deletedCart = await this.dao.deleteCart(cartId);
            return deletedCart;
        } catch (error) {
            console.log(error);
        }
    };

}

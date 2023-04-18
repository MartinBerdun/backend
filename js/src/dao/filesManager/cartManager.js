import fs from "fs";
export default class CartManager {

constructor (){
        this.path = "./js/files/carts.json";
}

        consultCarts = async () =>{
        if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8");
                const result = JSON.parse(data)
                return result;
        } else {
                return [];
        }
        }

        addCart = async () => {
        const carts = await this.consultCarts();
        const newcart = {
                id : 0,
                products : []
                }

        if (carts.length === 0){
                newcart.id = 1
        } else {
        (newcart.id = carts[carts.length - 1].id + 1);
        }
        carts.push(newcart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
        }

        getCartById = async (id) =>{
                const carts = await this.consultCarts();
                const cart = carts.find ((c) => c.id == id);
                if(!cart){
                        console.log("Id not found");
                }
                return cart;
        }

        addProducttoCart = async (idCart, idProduct)=>{
        const carts = await this.consultCarts();

        const cart = {
                        id : idProduct,
                        quantity : 1
                }

        const cartId = carts.find((c)=> c.id == idCart);
        const productId = cartId.products.find((p) => p.id == idProduct);

        if(cartId){
                if(productId){
                        productId.quantity++;
                }else {
                        cartId.products.push(cart)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        } else {
                return carts;
        }
        }

}




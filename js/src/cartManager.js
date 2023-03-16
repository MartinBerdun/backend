import fs from "fs";

export default class CartManager {

constructor (){
        this.path = "./js/files/carts.json";
        this.carts = []
}

        consultCarts = async () =>{


        if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8");
                const result = JSON.parse(data)
                return result;
        } else {
                await this.writefile(this.carts);
        }
        }

        writefile = async (carts) =>{
                return await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        }


        addCart = async (cart) => {
        const carts = await this.consultCarts();
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        }

        getCart = async () =>{
        const readCart = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(readCart);
        return result;
        }


}



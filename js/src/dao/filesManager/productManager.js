import fs from "fs";
import socket from "../../socket.js";
export default class ProductManager {

    constructor (){
        this.path = "./js/files/products.json";
    }

    consultProducts = async () =>{
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data)
            return result;
        } else {
            return []
        }
    }


    addProduct = async (product) =>{
        const products = await this.consultProducts();

        if(products.length === 0){
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1; 
        }
        products.push (product);
        await fs.promises.writeFile(this.path, 
            JSON.stringify(products, null, "\t"));
            socket.io.emit("products", products);// envio datos al servidor
        return product;
    }


    getProducts = async () =>{
        const readproducts = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(readproducts)
        return result;
    }

    getProductById = async (id) =>{
        const products = await this.getProducts();
        const prodId = products.find ((product) => product.id == id)
    return prodId;
    }


    updateProduct = async (id, changes) => {
        const products = await this.getProducts();
        const prodUpdate = products.find((product) => product.id == id);
        
        const productUpdated = {
            title: changes.title ?? prodUpdate.title ,
            description: changes.description ?? prodUpdate.description,
            price: changes.price ?? prodUpdate.price,
            thumbnail: changes.thumbnail ?? prodUpdate.thumbnail,
            code: changes.code ?? prodUpdate.code,
            category: changes.category ?? prodUpdate.category,
            status: changes.status ?? prodUpdate.status,
            stock: changes.stock ?? prodUpdate.stock,
            id,
        }

    for(let i = 0 ; i < products.length; i++){
        if(products[i].id == id){
            products[i] = productUpdated;
        }
    }
        await fs.promises.writeFile(this.path, 
            JSON.stringify(products, null, "\t"));
            return products;
    }

    deleteProduct = async (id)=>{
            const products = await this.getProducts();
            const newProducts=  products.filter ((product) => product.id != id);

            if (products.length === newProducts.length){
                console.log("Id not found");
            }

        await fs.promises.writeFile(this.path, 
        JSON.stringify(newProducts, null, "\t"));
        socket.io.emit("products", products);
        return newProducts;
    }
}

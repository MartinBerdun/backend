class ProductManager {

    constructor (){
        this.products = [];
    }

    getProducts = () =>{
        return this.products;
    }

    addProducts = (title, description,price, thumbnail, code, stock) =>{
        const product = {
            id: this.products.length +1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        const codeExist =
            this.products.find((product) => product.code === code);

        if (codeExist){
            console.log(`el codido ${code} ya existe`); 
            return this.products;
        } 
        
        this.products.push(product)
    }

    getProductById = (id) =>{
        const productId = this.products.find((product) => product.id === id)

        if (productId) return productId;
        console.error('not found')
        return {} ;
        
    }
}


const productManager = new ProductManager ();
productManager.addProducts('fideos', 'pasta italiana', 450, 'ruta de imagen', 'gtrb234', 45);
productManager.addProducts('zapa', 'zapaitaliana', 40, 'ruta de imagen', 'gtrb234', 46);

console.log(productManager.getProductById(2));
console.log(productManager.getProducts());
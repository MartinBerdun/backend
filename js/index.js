import ProductManager from "./appcoder.js";

const manager = new ProductManager ();

const env = async ()=>{

    //PRIMER CONSULTA
    const consult = await manager.consultProducts();
    console.log({consult});
    
    //aGREGO UN USUARIO
    const info = {
        title : "Adidas yeezie",
        description : "Zapatillas deportivas",
        price : 56,
        thumbnail : "empty",
        code : 34523,
        stock : 23,
    };

    const Add = await manager.addProduct(info);
    console.log({Add});

    // leo el archivo con los productos
    const read = await manager.getProducts()
    console.log({read});

    //busco el producto por ID 
    const productoId = await manager.getProductById(2)
    console.log({productoId});


    //Actualizo el producto
    const changes = {
        title : "Nike air force",
        description : "Zapatillas urbanas"
    }

    const update = await manager.updateProduct(1, changes);
    console.log({update});
    
    //Borro un producto
    const deleteProd = await manager.deleteProduct(2)
    console.log({deleteProd});

}

env();

//dudas
//en la ruta de this.path en el contructor
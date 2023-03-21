// ============ PRUEBAS PARA PRODUCTS ==============

import ProductManager from "./src/productManager.js";

const manager = new ProductManager ();

const env = async ()=>{

    //PRIMER CONSULTA
    const consult = await manager.consultProducts();
    console.log({consult});
    
//     // aGREGO UN USUARIO
    const info = {
        title : "bneobnenbe",
        description : "Zapatillas deportivas",
        price : 56,
        thumbnail : "empty",
        code : 34523,
        stock : 23,
    };

    const Add = await manager.addProduct(info);
    console.log({Add});

//     // leo el archivo con los productos
//     // const read = await manager.getProducts()
//     // console.log({read});

//     // busco el producto por ID 
//     // const productoId = await manager.getProductById(2)
//     // console.log({productoId});


//     // Actualizo el producto
//     const changes = {
//         title : "Nike air force",
//         description : "Zapatillas urbanas"
//     }

//     const update = await manager.updateProduct(1, changes);
//     console.log({update});
    
//     // Borro un producto
//     // const deleteProd = await manager.deleteProduct(2)
//     // console.log({deleteProd});

}

env();





//================= PRUEBAS PARA EL CARRITO ===========================

// import CartManager from "./src/cartManager.js";

// const manager = new CartManager ();

// const env = async ()=>{
//     //primerconsulta

//     const consult = await  manager.consultCarts();
//     console.log({consult});

//     // //añado un carrito

//     const addcart = await manager.addCart()
//     console.log({addcart});

//     //get cart by ID 
//     const get = await manager.getCartById(2)
//     console.log({get});

//     // const getcart = await managerC.getCart();
//     // console.log({getcart});

// }

// env ();

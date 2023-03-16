// // PARA QUE ANDE ESTE ARCHIVO TENGO QUE PONER EL TYPE : MODULE EN EL JSON

// import ProductManager from "./src/productManager.js";

// const manager = new ProductManager ();

// const env = async ()=>{

//     //PRIMER CONSULTA
//     const consult = await manager.consultProducts();
//     console.log({consult});
    
//     // aGREGO UN USUARIO
//     const info = {
//         title : "Vans",
//         description : "Zapatillas deportivas",
//         price : 56,
//         thumbnail : "empty",
//         code : 34523,
//         stock : 23,
//     };

//     const Add = await manager.addProduct(info);
//     console.log({Add});

//     // leo el archivo con los productos
//     const read = await manager.getProducts()
//     console.log({read});

//     // busco el producto por ID 
//     // const productoId = await manager.getProductById(2)
//     // console.log({productoId});


//     // Actualizo el producto
//     // const changes = {
//     //     title : "Nike air force",
//     //     description : "Zapatillas urbanas"
//     // }

//     // const update = await manager.updateProduct(5, changes);
//     // console.log({update});
    
//     // Borro un producto
//     // const deleteProd = await manager.deleteProduct(2)
//     // console.log({deleteProd});

// }

// env();

// // // dudas
// // // en la ruta de this.path en el contructor

// // import CartManager from "./src/cartManager.js";

// // const managerC = new CartManager ();

// // const env = async ()=>{
// //     //primerconsulta

// //     const consult = await  managerC.consultCarts();
// //     console.log({consult});

// //     const info = {
// //                 title : "Nike",
// //                 description : "Zapatillas deportivas",
// //                 price : 56,
// //                 thumbnail : "empty",
// //                 code : 34523,
// //                 stock : 23,
// //             };

// //     //añado un carrito

// //     const cart = {

// //     }

// //     const addcart = await managerC.addCart(cart)
// //     console.log(addcart);

// //     // añado un producto al cart
// //     const add = await managerC.addProducttoCart(info)
// //     console.log({add});

// //     // const getcart = await managerC.getCart();
// //     // console.log({getcart});

// // }

// // env ();
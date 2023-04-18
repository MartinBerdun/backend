import { productModel } from "../models/products.model.js";

export default class ProductManagerDb {

    constructor(){};

    getProducts = async (limit,page,category,status,sort) =>{
        try{
            let queries = {};
            parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
            const products = await productModel.paginate(queries, {
                limit,
                page,
                category,
                status,
                sort,
            });
            
            // const products = await productModel.find().lean();
            console.log(products);
            console.log(status);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    //ENDPOINT DE AGGREGATE
    // get = async () =>{
    //     try {
    //         // const productss = await productModel.aggregate([
    //         //     {$match: {category:"techno"}},
    //         //     {$group: {_id:"$status", totalPrice:{$sum:"$price"}}},
    //         //     {$sort: {totalPrice:1}},
    //         //     {$group:{_id:1, orders:{$push:"$$ROOT"}}}, //esto es para guardar tod el array anterior ya con filtros dentro de un nuevo documento dentro de un array llamado "orders", el push los guarda y el &&root toma todo el array a insertar
    //         //     {$project:{_id:0, orders: "$orders"}}, //
    //         //     {$merge: {into:"reports"}}
    //         // ])
    //         // console.log(productss);

    //         const products = await productModel.paginate({category:"techno"},{limit:3, page:1}) //aca puedo sacar el category y en totaldocs aparece el total de documentos
    //         console.log(products);

    //         // console.log(JSON.stringify(products, null,"\t"));
    //         return products;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    addProduct = async (product) =>{
        try {
            const productCreated = await productModel.create(product)
            return productCreated;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {
            const productFinded = await productModel.findById(id)
            return productFinded;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) =>{
        try {
            const productUpdated = await productModel.updateOne(id, product);
            return productUpdated;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {
            const productDeleted = await productModel.deleteOne(id);
            return productDeleted;
        } catch (error) {
            console.log(error);
        }
    }

}
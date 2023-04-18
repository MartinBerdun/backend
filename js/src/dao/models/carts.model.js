import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
    products: [
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", //hace referencia  a la coleccion de products
        required: true,
        index: true,
        },
        quantity: {
        type: Number,
        default: 1,
        required: true,
        index: true,
        },
    },
    ],
});

cartsSchema.pre('find', function () {
    this.populate("products.product")
})

// const cartsSchema = new mongoose.Schema({

//     products : [
//         {
//     productId : {
//         type:String,
//         required: true,
//         unique:true
//         },
//     quantity: {
//         type: Number,
//         required:true,
//         default:1,
//     }
//     },
//     ],
// })

export const cartModel = mongoose.model(cartsCollection, cartsSchema);

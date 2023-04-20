import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
    products: [
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", //hace referencia  a la coleccion de products
        required: true,
        // index: true,
        },
        quantity: {
        type: Number,
        default: 1,
        required: true,
        // index: true,
        },
    },
    ],
});

cartsSchema.pre('find', function () {
    this.populate("products.product")
})
cartsSchema.pre('findOne', function () {
    this.populate("products.product")
})

export const cartModel = mongoose.model(cartsCollection, cartsSchema);

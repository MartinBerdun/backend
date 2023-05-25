import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products: [
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", //hace referencia  a la coleccion de products
        },
        quantity: {
        type: Number,
        default: 1,
        required: true,
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

const cartModel = mongoose.model(cartsCollection, cartsSchema);

export default cartModel;

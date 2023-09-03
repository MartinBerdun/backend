import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index:true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        index:true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required:true,
    },
    owner: {
        type: String,
        default: "admin",
        required: true,
      },

})


productSchema.plugin(mongoosePaginate); 

export const productModel = mongoose.model(productsCollection, productSchema);


import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: "user"
    },
    cart: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        default : "6493976328d77677debf3746",
        ref:"carts"
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
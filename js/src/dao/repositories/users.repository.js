import userModel from "../models/user.model.js";

class UserRepository {


    getUsers = async ()=>{
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    
    getUserByEmail = async (email)=>{
        try {
            const user = await userModel.findOne(email);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    } 

    createUser = async (user)=>{
        try {
            const createdUser = await userModel.create(user);
            return createdUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserByCartId = async (cartId) => {
        try {
            const user = await userModel.findOne({ cart: cartId });
            return user;
        } catch (error) {
            console.log(error);
        }
    };


}

export const userRepository = new UserRepository();
import userModel from "../models/user.model.js";

class UserRepository {


    getUsers = async ()=>{
        try {
            const users = await userModel.find().lean();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (id)=>{
        try {
            const user = await userModel.findOne(id);
            return user;
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

    updateUser = async (query, update) => {
        try {
          const updatedUser = await userModel.updateOne(query, update);
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      };

    deleteUserById = async (id) => {
        try {
            const userDEleted = await userModel.deleteOne(id);
            return userDEleted;
        } catch (error) {
            console.log(error);
        }
    }

    deleteManyUsers = async (users) => {
        try {
            const deleteUsers = await userModel.deleteMany({ cart: { $in: users } });
            return deleteUsers;

        } catch (error) {
            console.log(error);
        }
    }


}

export const userRepository = new UserRepository();
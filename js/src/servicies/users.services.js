import { userRepository } from "../dao/repositories/users.repository.js";
import { isValidPassword, createHash } from "../utils.js";

class UserService {
    constructor(){}

    async getUsers () {
        try {
            const users = await userRepository.getUsers();
            if(!users) return console.log("No users found at service");

            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, password){
        try {

            const user = await userRepository.getUserByEmail(email);
            if(!user) return console.log("No user found at service");
            const validPassword = isValidPassword(user,password);
            if(!validPassword) return console.log("Invalid password / credentials")
            else {
                delete user.password;
                return user;
            };

        } catch (error) {
            throw new Error(error);
        }
    }

    async getUsersByEmail (email) {
        try {
            const users = await userRepository.getUsersByEmail({email});
            if (!users) return console.log("No users found by email at service/ Already exist");
        } catch (error) {
            throw new Error(error);
        }
    }

    async register (user){
        try {
            const userExist = await userRepository.getUserByEmail(user.email);
            if(userExist) return console.log("User already exists");

            return await userRepository.createUser(user)
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser (user) {
        try {
            const createdUser = await userRepository.createUser(user);
            if (!createdUser) return console.log("User not created at service");
            return createdUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByCartId (cartId) { 
        try {
        const user = await userRepository.getUserByCartId(cartId);
        if(!user) return console.log("User not found by cart id at service");
        return user;
    } catch (error) {
        throw new Error(error);
    }}

}

export const userService = new UserService();


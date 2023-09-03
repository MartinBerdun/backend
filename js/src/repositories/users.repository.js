export default class UserRepository {
    constructor (dao) {
        this.dao = dao;
    }

    getUsers = async ()=>{
        try {
            const users = await this.dao.getUsers()
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (id)=>{
        try {
            const user = await this.dao.getUserById(id);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getUserByEmail = async (email)=>{
        try {
            const user = await this.dao.getUserByEmail(email);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    } 

    createUser = async (user)=>{
        try {
            const createdUser = await this.dao.createUser(user);
            return createdUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserByCartId = async (cartId) => {
        try {
            const user = await this.dao.getUserByCartId(cartId);
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    updateUser = async (query, update) => {
        try {
          const updatedUser = await this.dao.updateUser(query, update);
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      };

    deleteUserById = async (id) => {
        try {
            const userDEleted = await this.dao.deleteUserById(id);
            return userDEleted;
        } catch (error) {
            console.log(error);
        }
    }

    deleteManyUsers = async (users) => {
        try {
            const deleteUsers = await this.dao.deleteManyUsers(users);
            return deleteUsers;
        } catch (error) {
            console.log(error);
        }
    }


}
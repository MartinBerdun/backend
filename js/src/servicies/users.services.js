import { userRepository } from "../dao/repositories/users.repository.js";
import { isValidPassword, createHash } from "../utils.js";

import { UserDTO } from "../dao/dtos/user.dto.js";
import { emailTemplate } from "../utils/mailHtml.js";

import config from "../config/config.js";

import jwt  from "jsonwebtoken";

const {JWT_SECRET, EMAIL_USER}= config;

import { transport } from "../transport.js";


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
            const users = await userRepository.getUsersByEmail(email);
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

    async recoverPassword(email) {
        try {
          const user = await userRepository.getUserByEmail({ email });

          if (!user) throw new Error(`Something went wrong at service`);
    
          const userDTO = new UserDTO(user);
          const { name } = userDTO;
    
          const token = jwt.sign({ email }, JWT_SECRET, {
            expiresIn: "1h",
          });

          if (!token) throw new Error("Auth token signing failed");

          const sentEmail = await transport.sendMail({
            from: `${EMAIL_USER}`,
            to: email,
            subject: `Password restore, ${name}!`,
            html: emailTemplate.passwordRestoreEmail(email, name, token),
            attachments: [],
        });

        return sentEmail;
        
        } catch (error) {
          console.log(`Failed to send email: ${error}`);
          throw error;
        }
    }


  async updatePassword(token, password) {
    try {
      const Token = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      });
      const { email } = Token;

      if (Date.now() / 1000 > Token.exp) {
        throw new Error("Token has expired. Request another recover link.");
      }

      const user = await userRepository.getUserByEmail({ email });

      const samePassword = isValidPassword(user, password);

      if (samePassword)
        throw new Error("The new password must be different from the old one.");

      const createhashedPassword = createHash(password);

      const passwordUpdate = await userRepository.updateUser(
        { email },
        { password: createhashedPassword }
      );
      if (!passwordUpdate)
        throw new Error(`Failed to update password for ${email}`);

      return passwordUpdate;

    } catch (error) {
      console.log(`Failed to update password: ${error}`);
      throw error;
    }
  }

  async changeRole(uid) {
    try {

      let { role } = await userRepository.getUserById({ _id: uid });

    if (role === "user") {
      role = "premium";
    } else if (role === "premium") {
      role = "user";
    } else {
      role = "admin";
    }

  console.log("Nuevo rol del usuario: " + role);

      const roleChanged = await userRepository.updateUser(
        { _id: uid },
        { role }
      );
      if (!roleChanged)
        throw new Error(`Failed to change role for user ${uid}`);

      return roleChanged;

    } catch (error) {
      console.log(`Failed to change role: ${error}`);
      throw error;
    }
  }

}

export const userService = new UserService();


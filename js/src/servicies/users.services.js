import { UserDTO } from "../dao/dtos/user.dto.js";
import { userRepository } from "../dao/repositories/users.repository.js";
import { isValidPassword, createHash } from "../utils.js";
import { cartsRepository } from "../dao/repositories/carts.repository.js";

import { emailTemplate } from "../utils/mailHtml.js";

import config from "../config/config.js";

import jwt  from "jsonwebtoken";

const {JWT_SECRET, EMAIL_USER}= config;

import { transport } from "../transport.js";


class UserService {
    constructor(){}

    async getUsers () {
        try {
            const user = await userRepository.getUsers();
            if(!user) return console.log("No users found at service");

              const users = user.map(user =>
                {
                  const userDto = new UserDTO(user);
                  return JSON.parse(JSON.stringify(userDto))
                })
             return users; 

        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(id) {
      try {
        const user = await userRepository.getUserById(id)
        if(!user) return console.log("No user found at service");
        
        const userDto = new UserDTO(user);

        const users =  JSON.parse(JSON.stringify(userDto))

        return users;
        
      } catch (error) {
        throw new Error(error);
      }
    }

    async updateConnection (email) {
      try {
        const updatedConnection = userRepository.updateUser(
          { email },
          { last_connection: new Date() }
        )
        if (!updatedConnection) throw new Error('Error updating user\'s last connection')
  
        return updatedConnection;
      } catch (error) {
        throw error
      }
    }

    loginUser (user) {
      try {
        const userDTO = new UserDTO(user)
        const jwtUser = JSON.parse(JSON.stringify(userDTO))
  
        const token = jwt.sign(jwtUser, JWT_SECRET, {
          expiresIn: expireTime
        })
        if (!token) throw new Error('Auth token signing failed')
  
        return token

      } catch (error) {
        throw error
      }
    }

    async getUsersByEmail (email) {
        try {
          
            const users = await userRepository.getUserByEmail({email});
            if (!users) return console.log("No users found by email at service/ Already exist");
            
            return users;
        
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

    async deleteUserById (id) {
      try {
        const userDEleted = await userRepository.deleteUserById(id);
        if(!userDEleted) return console.log("User not found or deleted");
        return userDEleted;
      } catch (error) {
        throw new Error(error);
      }
    }



    async deteleManyUsers (users) {
      try {
        const twoDays = 2 * 24 * 60 * 60 * 1000
        const currentTime = new Date() 
        const oneMinute = 1 * 60 * 1000;
        
        const inactiveUsers = users.filter((user) => {
          const lastConnection = new Date(user.last_connection)
          const timeDiff = currentTime - lastConnection
          return timeDiff > oneMinute
        })

        if (inactiveUsers.length === 0) throw new Error('No inactive users were found')

        const inactiveUserIds = inactiveUsers.map((user) => user.cart)

        await cartsRepository.deleteCart(inactiveUserIds);

        const deletedUsers = await userRepository.deleteManyUsers(inactiveUserIds)

        inactiveUsers.forEach(async (user) => {
          const sentEmail = await transport.sendMail({
            from: `${EMAIL_USER}`,
            to: user.email,
            subject: `You have been deleted ${user.name}!`,
            attachments: [],
        });
        return sentEmail;
      })

        if (!deletedUsers) throw new Error(`Error deleting user `)

        return deletedUsers
      
      } catch (error) {
        throw new Error(error);
      }
    }

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




  async changeRole (uid) {
    try {

      const user = await userRepository.getUserById({ _id: uid })
      
      const requiredStatus = ['identification', 'address', 'statement']
      let missingStatus = []
      let roleChanged = false

        const userStatus = user.status

        missingStatus = requiredStatus.filter((el) => !userStatus.includes(el))

        if (requiredStatus.every((el) => userStatus.includes(el)) || user.role === 'premium') {

          const role = user.role === 'user' ? 'premium' : 'user'

          roleChanged = await userRepository.updateUser({ _id: uid },{ role })

        } else {

          throw new Error(`You're missing the following documentantion to upgrade your role: ${missingStatus.join(', ')}`)
        }
      
      if (!roleChanged) { throw new Error(`Failed to change role for user ${uid}`) }

      return roleChanged

    } catch (error) {

      throw new Error ( error)
    }
  }


  async updateUserDocuments (email, userDocuments) {
    try {

      const newUserStatus = []
      const newUserDocuments = []

      const { documents } = await userRepository.getUserByEmail(email)

      Object.values(userDocuments).forEach((els) => {
        els.forEach((el) => {
          const document = {
            name: el.fieldname,
            reference: `${el.fieldname}/${el.filename}`
          }
          newUserDocuments.push(document)
        })
      })

      newUserDocuments.forEach((newUserDoc) => {
        const existingDocIndex = documents.findIndex(
          (doc) => doc.name === newUserDoc.name
        )
        if (existingDocIndex !== -1) {
          documents[existingDocIndex] = newUserDoc
        } else {
          documents.push(newUserDoc)
        }
      })

      documents.forEach((el) => {
        newUserStatus.push(el.name)
      })

      const updates = {
        documents,
        status: newUserStatus
      }

      const updatedUser = await userRepository.updateUser( email , updates)

      return updatedUser;

    } catch (error) {
      throw error
    }
  }

}

export const userService = new UserService();


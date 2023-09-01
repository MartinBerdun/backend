import { userService } from "../servicies/users.services.js";
import { cartService } from "../servicies/carts.services.js";
import { userRepository } from "../dao/repositories/users.repository.js";
import  jwt  from "jsonwebtoken";
import config from "../config/config.js";
import { UserDTO } from "../dao/dtos/user.dto.js";
import { isValidPassword } from "../utils.js";

const {JWT_SECRET, EMAIL_USER, COOKIE_NAME}= config;

export const getUsers = async (req,res) => {
    try {
        const users = await userService.getUsers();
        if(!users){
            return res.status(404).send({error: "users not found"})
        }
        
        return res.status(200).send({status: "success", payload : users })
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (req,res) => {
  try {

      const {uid} = req.params;
      const users = await userService.getUser(uid);
      if(!users){
          return res.status(404).send({error: "users not found"})
      }

      return res.status(200).send({status: "success", payload : users })
  } catch (error) {
      throw new Error(error);
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const {id} = req.body;

    const userDeleted = await userService.deleteUserById(id);
    const cart = await cartService.deleteCart(id)

    if (!userDeleted) {
      return res.status(400).send({error: "users not found or deleted at controller"})
    }

    return res.status(200).send({status: "success", payload : userDeleted })

  } catch (error) {
    throw new Error(error);
  }
}

export const deleteManyUsers = async (req,res) => {
  try {
    const users = await userService.getUsers()

    if (!users) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to get users'
      })
    }
    
    const usersdeleted = await userService.deteleManyUsers(users)

    if(!usersdeleted){
      return res.status(404).send({error: "users not deleted"})
  }

    return res.status(200).send({status: "success", payload : usersdeleted })

  } catch (error) {
    req.logger.error(`Failed to delete users: ${error}`);
      return res.status(500).send({ status: "error", error: `${error}` });
  }
}

export const registerUser = async (req, res) => {
    try {
        return res
        .status(201)
        .send({ status: "success", message: "User registered" });
    } catch (error) {
        console.log(`Failed to register user: ${error}`);
        return res
        .status(404)
        .send({ status: "error", error: "Failed to register user" });
    }
  };

export const failRegister = async (req, res) => {
    return res
      .status(409)
      .send({ status: "error", message: "User already exists" });
};

export const login = async (req, res) => {
  try {
    const {email,password}=req.body;
        
        const user = await userRepository.getUserByEmail({email: email});

        if(!user) return res.status(401).send({status: "error", error :"User does not exist"});

        if(!isValidPassword(user, password)) return res.status(401).send({status: "error", error :"Invalid credentials"});
        
        const userDTO = new UserDTO(user);
        const jwtUser = JSON.parse(JSON.stringify(userDTO));

        const token = jwt.sign(jwtUser,JWT_SECRET, {expiresIn: "24h"})

        const last_connection = userService.updateConnection(email)

        if (!last_connection) {
            return res
                .status(500)
            .send({ status: 'error', error: 'Failed to update last connection' })
    }
        return res
        .cookie(COOKIE_NAME, token, {httpOnly: true})
        .send({status:"success", message:"Logged in"})

  } catch (error) {
    req.logger.error(`Failed to login with error: ${error}`)
    return res.status(500).send({ status: 'error', error: 'Login failed' })
    
  }
}

export const logout = async (req, res) => {

    const { jwtCookie: token } = req.cookies
    const Token = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      });
      
      const { email } = Token;

    const last_connection = await userService.updateConnection(email)

   if (!last_connection) {
    req.logger.error('Failed to update last connection')
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to update last connection' })
  } 

  return res
    .clearCookie(COOKIE_NAME)
    .send({ status: 'success', message: 'Logout successful!' })
  
}

export const githubLogin = async (req, res) => {}

export const githubCallback = async (req, res) => {
  try {
    const { user } = req
    const token = userService.loginUser(user)

    if (!token) {
      return res
        .status(500)
        .send({ status: 'error', error: 'Failed to generate JWT token' })
    }

    return res.cookie(COOKIE_NAME, token, { httpOnly: true }).redirect('/login')

  } catch (error) {
    req.logger.error(`Failed to handle GitHub callback with error: ${error}`)
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to handle GitHub callback' })
  }
}

export const currentUser = (req, res) => {
  return res.status(200).send({ status: 'success', payload: req.user })
}

export const recoverPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).send({
          status: "error",
          error: "Incomplete values",
        });
      }
  
      await userService.recoverPassword(email);
  
      return res.status(200).send({
        status: "success",
        message: "Email to reset password was successfully sent",
      });
    } catch (error) {
      req.logger.error(`Failed to send email: ${error}`);
      return res.status(500).send({ status: "error", error: `${error}` });
    }
  };

  export const updatePassword = async (req, res) => {
    try {
      const { password, token } = req.body;
  
      if (!password || !token) {
        return res.status(400).send({
          status: "error",
          error: "Incomplete values",
        });
      }
  
      const passwordUpdate = await userService.updatePassword(token, password);
  
      if (!passwordUpdate) {
        return res
          .status(500)
          .send({ status: "error", error: "Cannot update password" });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Password updated successfully",
      });
    } catch (error) {
      req.logger.error(`Failed to update user password: ${error}`);
      return res.status(500).send({ status: "error", error: `${error}` });
    }
  };



export const changeRole = async (req, res) => {
    try {
      const { uid } = req.params;

      req.logger.debug(uid)
  
      if (!uid) {
        return res.status(400).send({
          status: "error",
          error: "Incomplete values",
        });
      }
  
      const roleChanged = await userService.changeRole(uid);
  
      if (!roleChanged) {
        return res
          .status(500)
          .send({ status: "error", error: "Failed to change role" });
      }
  
      return res.status(200).send({
        status: "success",
        message: `Successfully changed role for user ${uid}`,
      });
    } catch (error) {
      
      req.logger.error(`Failed to change role: ${error}`);
      return res.status(500).send({ status: "error", error: `${error}` });
    }
  };

  export const updateUserDocuments = async (req, res) => {
    try {

      const { uid } = req.params;
      const newDocuments = req.files;

      if (!newDocuments)
        return res
          .status(400)
          .send({ status: "error", error: "No documents selected" });

      const user = await userService.getUser({ _id: uid });

      if (!user)
        return res
          .status(400)
          .send({ status: "error", error: `No se encontró el user con id ${uid}`  });

      const updatedUserDocuments = await userService.updateUserDocuments(
        user,
        newDocuments
      );

      if (!updatedUserDocuments) {
        return res
          .status(404)
          .send({ status: "error", error: "Failed to update documents" });
      }
  
      res.status(200).send({ status: "success", message: "Upload documents succesfully" });
      
      
    } catch (error) {
      
      req.logger.error(`Failed to update documents: ${error}`);

      return res.status(500).send({ status: "error", error: `Documents cannot be apdated ${error}` });
    }
  }
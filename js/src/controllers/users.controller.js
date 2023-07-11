import { userService } from "../servicies/users.services.js";

export const getUsers = async (req,res) => {
    try {
        const users = await userService.getUsers();
        if(!users){
            return res.status(404).send({error: "carts not found"})
        }

        return res.status(200).send({status: "success", payload : users })
    } catch (error) {
        throw new Error(error);
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
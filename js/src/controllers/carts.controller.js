import { cartService } from "../servicies/index.js";
import { ticketService } from "../servicies/index.js";

export const getCarts = async (req,res) => {
    try {

        const carts = await cartService.getCarts();
        
        if (!carts) {
            return res.status(404).send({error: "carts not found"})
        }
        
        return res.status(200).send({status: "success", payload : carts })

    }catch(error) {

        console.log(`Failed to create cart with mongoose ${error}`);
        
        return res
            .status(404)
            .send({ status: "error", error: "Carts not created or found" });    
    }
}

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart();

        if (!cart) return res.status (404). send({ status: "error", error: "cart not created al controllers"})

        return res.status(200).send({status: "success", payload : cart })

    } catch (error) {

        console.log(`Failed to create cart with mongoose ${error}`);

        return res
            .status(500)
            .send({ status: "error", error: "Failed to create cart" });
        
    }
}

export const createTicket = async (req, res) => {
    try {
        const { cid } = req.params;
  
        if (!cid) {
        return res.status(400).send({
            status: "error",
            error: "Incomplete values",
        });
    }

        const newTicket = await ticketService.createTicket(cid);

        if (!newTicket) {
            return res.status(404).send({
            status: "error",
            error: "Failed to create ticket",
        });
    }

        res.status(200).send({ status: "success", payload: newTicket });

    } catch (error) {
        console.log(`Failed to create ticket ${error}`);
        return res
        .status(500)
        .send({ status: "error", error: "Failed to create ticket" });
    }
};

export const getCartById = async (req,res) => {
    try {
        const cid  = req.params.cid;

    if (!cid) {
        return res.status(400).send({
        status: "error",
        error: "Incomplete values",
        });
    }

    const cart = await cartService.getCartById(cid);

    if(!cart) {
        return res.status(404).send({status: "error", error: "Cart not found"});
    }

    return res.status(200).send({status: "success", payload: cart})

    } catch (error) {
        console.log(`Cannot get cart with mongoose ${error}`);
    return res.status(500).send({
        status: "error",
        error: "Failed to get cart by Id",
    });
    }
}

export const addProduct = async (req, res) => {
    try {

        const {cid, pid} = req.params;
        const {quantity} = req.body;
        const  token  = req.cookies.jwtCookie;

        console.log(token);

    if (!token) {
      return res.status(400).send({
        status: "error",
        error: "Cannot get token",
      });
    }

        if (!cid || !pid) {
            return res.status(400).send({
                status: "error",
                error: "Incomplete values",
            });
        }

        const productsAdded = await cartService.addProduct(cid, pid, quantity, token)

        if (!productsAdded) {
            return res.status(404).send({
                status: "error",
                error: "Product not added to cart / Failed to add",
                });
        }

        return res.status(200).send({status:"success", payload: productsAdded});
        
    } catch (error) {
        console.log(`Cannot get cart with mongoose ${error}`);
    return res.status(500).send({
        status: "error",
        error: "Failed to get cart by Id",
    });
    }
}

export const updateCart = async (req, res) => {
    try {
        const updatedcart = await cartService.updateCart()

        if (!updatedcart) return res.status (404). send({ status: "error", error: "cart not updated"});

        return res.status(200).send({status:"success", payload: updatedcart});
        
    } catch (error) {
        console.log(`Cannot update cart ${error}`);
    return res
        .status(500)
        .send({ status: "error", error: "Failed to update cart" });
    }
}

export const updateQuantityInCart = async (req, res) => {
    try {

        const {cid, pid} = req.params;
        const { quantity} = req.body;

        if (!cid || !pid) {
            return res.status(400).send({
                status: "error",
                error: "Incomplete values",
            });
        }

        const quantityIncart = await cartService.updateQuantityInCart(cid, pid, quantity);

        if (!quantityIncart) {
            return res.status (404). send({ status: "error", error: "quantity in cart not updated"});
        }

        return res.status(200).send({status:"success", payload: quantityIncart});
        
    } catch (error) {
        console.log(`Cannot update quantity in cart ${error}`);
    return res
        .status(500)
        .send({ status: "error", error: "Failed to update quantity in cart" });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const {cid, pid} = req.params;

        if (!cid || !pid) {
            return res.status(400).send({
                status: "error",
                error: "Incomplete values",
            });
        }

        const productInCart = await cartService.deleteProductFromCart(cid, pid);

        if (!productInCart) {
            return res.status(404).send({status:"error", error: "Product not deleted in cart"})
        }

        return res.status(200).send({status:"success", payload: productInCart})

    } catch (error) {
        console.log(`Cannot delete product in cart ${error}`);
        return res
            .status(500)
            .send({ status: "error", error: "Failed to delete product in cart" });
    }
}

export const deleteCart = async (req, res) => {
    try {

        const {cid} = req.params;

        if (!cid) {
            return res.status(400).send({
                status: "error",
                error: "Incomplete values",
            });
        }
        
        const deletedCart = await cartService.deleteCart(cid);

        if (!deletedCart) {
            return res.status(404).send({status: "error", error: "Cart not found/ not deleted"});
        }

        return res.status(200).send({status: "success", payload: deletedCart})

    } catch (error) {
        console.log(`Cannot delete cart ${error}`);
        return res
            .status(500)
            .send({ status: "error", error: "Failed to delete cart" });
    }
}






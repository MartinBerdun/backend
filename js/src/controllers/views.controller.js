import { productService } from "../servicies/index.js";
import { cartService } from "../servicies/index.js";
import { ticketService } from "../servicies/index.js";
import { userService } from "../servicies/index.js";


export const loginView = (req, res) => {
    res.render("login", {
        style: "styles.css",
    });
};

export const RegisterView = (req, res) => {
    res.render("register",)
}

export const profileView = async (req, res) => {
    try {
        const { email } = req.user
        const user = await userService.getUsersByEmail(email)
        console.log({user});
        res.render('profile', {
          userId: user._id,
          user: req.user,
        })
      }catch(error){
        console.log(error)
      }
}

export const homeView = async (req, res) => {
    try {
        const { limit = 10, page = 1, category, status, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
    } = await productService.getProducts(limit,page, category, status, sort);
    res.render("products", {
        user : req.user,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        style: "style.css",
        title: "Products",
    });
    } catch (error) {
        console.log(`Failed to render home view: ${error}`);
    res
        .status(500)
        .send({ status: "error", error: "Failed to render home view" });
    }
}

export const productView = async (req, res) => {
    try {
        const  {pid}  = req.params;
    const product = await productService.getProductById(pid);
    res.render("product", {
        user : req.user,
        product,
        style: "product.css",
        title: "Product Detail",
    });
    } catch (error) {
        console.log(`Failed to render product view: ${error}`);
        res
        .status(500)
        .send({ status: "error", error: "Failed to render product view" });
    }
}

export const cartView = async (req, res) => {
    try {
        const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
    res.render("cart", {
    cart,
    style: "cart.css",
    title: "Cart Detail",
    });
    } catch (error) {
        console.log(`Failed to render cart view: ${error}`);
        res
        .status(500)
        .send({ status: "error", error: "Failed to render cart view" });
    }
}

export const ticketView = async (req, res) => {
    try {

        const { email } = req.user
        const tickets = await ticketService.getTicketsByEmail(email);
        tickets.forEach((ticket) => {
            const date = new Date(ticket.purchase_datetime).toLocaleString()
            ticket.purchase_datetime = date
          })
        res.render('ticket', {
            user: req.user,
            tickets,
            style: "ticket.css",
            title: "Tickets",
        })

    } catch (error) {
        console.log(`Failed to render ticket view: ${error}`);
    res
        .status(500)
        .send({ status: "error", error: "Failed to render ticket view" });
    }
}

export const restoreView = (req, res) => {
    try {
        res.render("restore")
    } catch (error) {
        console.log(`Failed to render restore password view: ${error}`);
        res
        .status(500)
        .send({ status: "error", error: "Failed to render restore password view" });
    }
}

export const newPasswordView = (req, res) => {
    try {
        res.render("newPassword")
    } catch (error) {
        console.log(`Failed to render restore password view: ${error}`);
        res
        .status(500)
        .send({ status: "error", error: "Failed to render restore password view" });
    }
}


export const adminView = async (req, res) => {
    try {
      const users = await userService.getUsers()
  
      const existingUsers = users.map((user) => {
        
        const parsedDate = new Date(user.last_connection)
        const parsedUser = { ...user }
        parsedUser.last_connection = parsedDate.toLocaleString()
        return parsedUser
      })
  
      res.render('admin', {
        existingUsers,
        title: 'UsersAdministration '
      })
    } catch (error) {
      req.logger.error(`Failed to render admin view: ${error}`)
      res
        .status(500)
        .send({ status: 'error', error: 'Failed to render admin view' })
    }
  }
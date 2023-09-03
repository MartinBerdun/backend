import ProductService from "./products.services.js"
import UserService from "./users.services.js"
import CartService from "./carts.services.js"
import TicketService from "./ticket.services.js"


export const productService = new ProductService()
export const cartService = new CartService()
export const userService = new UserService()
export const ticketService = new TicketService()

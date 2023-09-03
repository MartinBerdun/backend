import { productDAO, ticketDAO, userDAO, cartDAO} from "../dao/factory.js";

import ProductsRepository from "./products.repository.js";
import CartsRepository from "./carts.repository.js";
import TicketRepository from "./ticket.repository.js";
import UserRepository from "./users.repository.js";

export const productRepository = new ProductsRepository(productDAO);
export const userRepository = new UserRepository(userDAO);
export const ticketRepository = new TicketRepository(ticketDAO);
export const cartRepository = new CartsRepository(cartDAO);
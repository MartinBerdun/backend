import { ticketRepository } from "../dao/repositories/ticket.repository.js";
import { cartsRepository } from "../dao/repositories/carts.repository.js";

import { productRepository } from "../dao/repositories/products.repository.js";

import { userRepository } from "../dao/repositories/users.repository.js";

import { v4 as uuidv4 } from "uuid";

import { transport } from "../transport.js";

import config from "../config.js";

const { EMAIL_USER } = config;



class TicketService {
    constructor(){
    }

async getTickets() {
        try {
            const tickets = await ticketRepository.getTickets();
            if (!tickets) throw new Error(`No tickets found`);
    
            return tickets;
        } catch (error) {
            console.log(`Failed to get ticket with error: ${error}`);
            throw error;
        }
    }

async getTicketById(tid) {
        try {
            const filteredTicket = await ticketRepository.getTicketById(tid);
            if (!filteredTicket)
            throw new Error(`Ticket with id: ${tid} does not exist`);
    
            return filteredTicket;
        } catch (error) {
            console.log(`Failed to get ticket with error: ${error}`);
            throw error;
        }
    }
    
async getTicketsByEmail(email) {
        try {
            const filteredTickets = await ticketRepository.getTicketsByEmail(email);
            if (!filteredTickets)
                throw new Error(`No tickets with email: ${email} exist`);
    
            return filteredTickets;
        } catch (error) {
            console.log(`Failed to get tickets with error: ${error}`);
            throw error;
        }
    }
    
async createTicket(cid) {
        try {
            const user = await userRepository.getUserByCartId(cid);
            if(!user) throw new Error (`User with cart ID ${cid} does not exist`);
            const cart = await cartsRepository.getCartById(cid);
            if (!cart) throw new Error(`Cart with id: ${cid} does not exist`);
    
            const products = [];
            let ammount = 0;
    
        cart.products.forEach(
            ({ product: { _id: pid, stock, price, title }, quantity: qty }) => {
                if (qty > stock) {
                const deletedProductFromCart =
                    cartsRepository.deleteProductFromCart(cid, pid);
                if (!deletedProductFromCart)
                    throw new Error(`Error deleting product ${pid} from cart ${cid}`);
                console.warn(`Product ${title} is out of stock. Removed from cart`);
                } else {
                products.push({
                    product: pid,
                    quantity: qty,
                  ammount: price * qty,
                });
    
                const deletedProductFromCart =
                    cartsRepository.deleteProductFromCart(cid, pid);
                if (!deletedProductFromCart)
                    throw new Error(`Error deleting product ${pid} from cart ${cid}`);
    
                const newStock = { stock: stock - qty };
                productRepository.updateProduct(pid, newStock);
                ammount += price * qty;
                }
            }
        );
    
            if (products.length === 0)
            throw new Error("Products out of stock.");
            console.log({products});
    
            const code = uuidv4();

            const purchase_datetime = new Date().toLocaleString();

            const { email: purchaser } = await userRepository.getUserByCartId(cid);
    
            const ticket = {
            code,
            purchase_datetime,
            ammount,
            purchaser,
            };

            console.log({ammount});
    
            const newTicket = await ticketRepository.createTicket(ticket);

            if (!newTicket) throw new Error("Error creating new ticket");
    
            return newTicket;

        } catch (error) {
            console.log(`Failed to create ticket with error: ${error}`);
            throw error;
        }
    }

    async sendEmail(mail){
        try {
            

            const sentEmail = await transport.sendMail({
                from: `${EMAIL_USER}`,
                to: mail.email,
                subject: "Testin Nodemailer",
                text: "Testin email sent",
                attachments: [],
            });
        
            if (!sentEmail) throw new Error(`Email send failure`);
        
            return sentEmail;
        } catch (error) {
            throw new Error (error);
        }
    }



}



export const ticketService = new TicketService();
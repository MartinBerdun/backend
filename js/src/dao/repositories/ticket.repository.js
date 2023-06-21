import { ticketModel } from "../models/ticket.model.js";


class TicketRepository {
    constructor () {}

    getTickets = async () => {
        try {
            const tickets = await ticketModel.find().lean();
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };
    
    getTicketById = async (ticketId) => {
        try {
            const ticket = await ticketModel.findById(ticketId).lean();
            return ticket;
        } catch (error) {
            console.log(error);
        }
    };
    
    getTicketsByEmail = async (email) => {
        try {
            const tickets = await ticketModel.find({ purchaser: email }).lean();
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };
    
    createTicket = async (ticket) => {
        try {
            const newTicket = await ticketModel.create(ticket);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    };
}



export const ticketRepository = new TicketRepository();


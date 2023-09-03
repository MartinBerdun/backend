export default class TicketRepository {
    constructor (dao) {
        this.dao = dao;
    }

    getTickets = async () => {
        try {
            const tickets = await this.dao.getTickets();
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };
    
    getTicketById = async (ticketId) => {
        try {
            const ticket = await this.dao.getTicketById(ticketId);
            return ticket;
        } catch (error) {
            console.log(error);
        }
    };
    
    getTicketsByEmail = async (email) => {
        try {
            const tickets = await this.dao.getTicketsByEmail(email);
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };
    
    createTicket = async (ticket) => {
        try {
            const newTicket = await this.dao.createTicket(ticket)
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    };
}





import { ticketService } from "../servicies/index.js";

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTickets();

        if (!tickets) {
        return res.status(404).send({
            status: "error",
            error: "Tickets not found",
        });
    }

        return res.status(200).send({
        status: "success",
        payload: tickets,
        });
    } catch (error) {
        console.log(`Cannot get tickets with mongoose ${error}`);
        return res.status(500).send({
        status: "error",
        error: "Failed to get tickets",
        });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const { tid } = req.params;

        if (!tid) {
        return res.status(400).send({
            status: "error",
            error: "Incomplete values",
        });
    }

        const filteredTicket = await ticketService.getTicketById(tid);

        if (!filteredTicket) {
            return res.status(404).send({
            status: "error",
            error: "Ticket not found",
        });
        }

        return res.status(200).send({
        status: "success",
        payload: filteredTicket,
        });
    } catch (error) {
        console.log(`Cannot get ticket with mongoose ${error}`);
        return res.status(500).send({
        status: "error",
        error: "Failed to get ticket",
        });
    }
};

export const getTicketsByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
        return res.status(400).send({
            status: "error",
            error: "Incomplete values",
        });
    }

        const filteredTicket = await ticketService.getTicketsByEmail(email);

        if (!filteredTicket) {
            return res.status(404).send({
            status: "error",
            error: "Ticket not found",
        });
    }

        return res.status(200).send({
            status: "success",
            payload: filteredTicket,
        });
    } catch (error) {
        console.log(`Cannot get ticket with mongoose ${error}`);
        return res.status(500).send({
        status: "error",
        error: "Failed to get ticket",
    });
    }
};

export const sendEmail = async (req, res) => {
    try {
        const email = req.body;

        if (!email) {
            return res.status(400).send({
            status: "error",
            error: "Incomplete values",
        });
    }

        const sentEmail = await ticketService.sendEmail({email});

        if (!sentEmail) {
            return res.status(404).send({
            status: "error",
            error: "Not email sent",
        });
        }

        return res.status(200).send({
            status: "success",
            payload: sentEmail,
        });
        
    } catch (error) {
        console.log(`Cannot send email with nodemailer ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to send email",
    });
}
  };
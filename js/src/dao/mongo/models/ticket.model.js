import mongoose from "mongoose";

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    purchase_datetime: {
        type: String
    },
    ammount: {
        type: Number,
    },
    purchaser: {
        type: String
    }
})

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);

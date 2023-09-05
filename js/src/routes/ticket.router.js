import { Router } from "express";
import passport from "passport";
import {
    getTickets,
    getTicketById,
    getTicketsByEmail,
    sendEmail
} from "../controllers/ticket.controller.js";

const router = Router();

router.get("/",(req, res, next) => authRole(req, res, next, "admin") ,getTickets);

router.get("/:tid",getTicketById);

router.get("/orders/:email",(req, res, next) => authRole(req, res, next, ["user", "premium"]) ,getTicketsByEmail);


export default router;
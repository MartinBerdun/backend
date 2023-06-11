import { Router } from "express";
// import { verifyRole } from "../middlewares/auth.js";
import {
    getTickets,
    getTicketById,
    getTicketsByEmail,
} from "../controllers/ticket.controller.js";

const router = Router();

router.get(
    "/",
    // (req, res, next) => verifyRole(req, res, next, "admin"),
    getTickets
);

router.get("/:tid", getTicketById);

router.get(
    "/orders/:email",
    // (req, res, next) => verifyRole(req, res, next, "user"),
    getTicketsByEmail
);

// router.post(
//     "/mail",
//     (req, res, next) => verifyRole(req, res, next, "user"),
//     sendTicketEmail
// );

export default router;
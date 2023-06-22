import { Router } from "express";
import passport from "passport";
import {
    getTickets,
    getTicketById,
    getTicketsByEmail,
    sendEmail
} from "../controllers/ticket.controller.js";

const router = Router();

router.get("/",getTickets);

router.get("/:tid",getTicketById);

router.get("/orders/:email",getTicketsByEmail);

router.get("/mail",passport.authenticate("jwt", { session: false }), (req, res)=>{
    const jwtUser = req.user;
    console.log({jwtUser});

    const {email} = new UserDTO(jwtUser);
    console.log({email});
},sendEmail);

export default router;
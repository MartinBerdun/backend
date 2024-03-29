import nodemailer from "nodemailer";
import config from "./config/config.js";

const { EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = config;

export const transport = nodemailer.createTransport({
    service : EMAIL_SERVICE,
    port : EMAIL_PORT,
    auth :{
        user : EMAIL_USER,
        pass : EMAIL_PASSWORD,
    }

})
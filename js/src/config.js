import dotenv from "dotenv";
dotenv.config();


const config = {
    dbUrl : process.env.DB_URL,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET,
    clientID : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl : process.env.CALLBACK_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_CODER : process.env.ADMIN_CODER,
    ADMIN_PASSWORD : process.env.ADMIN_PASSWORD,

    EMAIL_SERVICE : process.env.EMAIL_SERVICE,
    EMAIL_PORT : process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

}

export default config;
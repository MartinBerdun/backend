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

}

export default config;
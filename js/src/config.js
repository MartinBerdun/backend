import dotenv from "dotenv";
dotenv.config();


const config = {
    dbUrl : process.env.DB_URL,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET,
}

export default config;
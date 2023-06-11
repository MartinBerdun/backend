import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; //representa la ruta absoluta de los archivos estaticos
import viewsRouter from "./routes/views.router.js";
import socket from './socket.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import database from './db.js';
import morgan from 'morgan';
import config from './config.js';
import sessionsRouter from './routes/sessions.router.js';
import passport from 'passport';
import initializePassport from './auth/passport.js';
import ticketsRouter from './routes/ticket.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.dbUrl,
            ttl: 15,
        }),

    secret:"config.SESSION_SECRET",
    resave:true,
    saveUninitialized:false,
}))

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/ticket", ticketsRouter);
app.use("/", viewsRouter);

//configuracion de handlebars
app.engine("handlebars", handelbars.engine()); //crea un motor de plantillas llamado handlebars
app.set("views", `${__dirname}/views`); //le dice al servidor donde encuentra las plantillas 
app.set("view engine", "handlebars") // crea el motor de vistas 


const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
});

database.connect()

socket.connect(httpServer);


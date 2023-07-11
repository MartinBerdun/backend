import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; //representa la ruta absoluta de los archivos estaticos
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";
import cookieParser from "cookie-parser";
// import mongoose from 'mongoose';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
import database from "./db.js";
import morgan from "morgan";
// import config from './config.js';
import userRouter from "./routes/user.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import ticketsRouter from "./routes/ticket.router.js";

import { errorMiddleware } from "./middlewares/error.js";

import { addLogger } from "./utils/logger.js";
import loggerRouter from "./routes/logger.router.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
/* app.use(morgan("dev"));
 */ app.use(cookieParser());
//     session({
//         store: MongoStore.create({
//             mongoUrl: config.dbUrl,
//             ttl: 120,
//         }),

//     secret:"config.SESSION_SECRET",
//     resave:true,
//     saveUninitialized:false,
// })
// )

//Passport
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());

app.use(addLogger);


//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/logger", loggerRouter);
app.use("/", viewsRouter);

app.use(errorMiddleware);
//configuracion de handlebars
app.engine("handlebars", handelbars.engine()); //crea un motor de plantillas llamado handlebars
app.set("views", `${__dirname}/views`); //le dice al servidor donde encuentra las plantillas
app.set("view engine", "handlebars"); // crea el motor de vistas

const httpServer = app.listen(8080, () => {
  console.log("Listening on port 8080");
});

database.connect();

socket.connect(httpServer);

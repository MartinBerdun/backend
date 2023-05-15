import express from 'express';
import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; //representa la ruta absoluta de los archivos estaticos
import viewsRouter from "../src/routes/views.routes.js";
import socket from './socket.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import database from './db.js';
import morgan from 'morgan';
import config from './config.js';
// import sessionsRouter from './routes/sessions.router.js';
import passport from 'passport';
import initializePassport from './auth/passport.js';

import UsersRouter from './routes/users.js';
import SessionsRouter from './routes/sessions.js';

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const usersRouter = new UsersRouter();
app.use("/api/users", usersRouter.getRouter());

const sessionsRouter = new SessionsRouter();
app.use ("/api/sessions", sessionsRouter.getRouter());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
// app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

//configuracion de handlebars
app.engine("handlebars", handelbars.engine()); //crea un motor de plantillas llamado handlebars
app.set("views", `${__dirname}/views`); //le dice al servidor donde encuentra las plantillas 
app.set("view engine", "handlebars") // crea el motor de vistas 


const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
});

database.connect()

// mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@codercluster.gk2ir0t.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`) //aca tiene que ir la contraseña del usuario del cluster de mongodb y no de la cuenta en general!!

/////SOCKET.IO

socket.connect(httpServer);


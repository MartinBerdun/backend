import express from 'express';
import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; //representa la ruta absoluta de los archivos estaticos
import viewsRouter from "../src/routes/views.routes.js";
import socket from './socket.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//configuracion de handlebars

app.engine("handlebars", handelbars.engine()); //crea un motor de plantillas llamado handlebars
app.set("views", `${__dirname}/views`); //le dice al servidor donde encuentra las plantillas 
app.set("view engine", "handlebars") // crea el motor de vistas 



const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
});

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@codercluster.gk2ir0t.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`) //aca tiene que ir la contraseña del usuario del cluster de mongodb y no de la cuenta en general!!

/////SOCKET.IO

socket.connect(httpServer);


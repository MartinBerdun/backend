import express from 'express';
import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; //representa la ruta absoluta de los archivos estaticos
import viewsRouter from "../src/routes/views.routes.js";
import { Server } from 'socket.io';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//configuracion de handlebars

app.engine("handlebars", handelbars.engine()); //crea un motor de plantillas llamado handlebars
app.set("views", `${__dirname}/views`); //le dice al servidor donde encuentra las plantillas 
app.set("view engine", "handlebars") // crea el motor de vistas 

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Server runing at port 8080");
});

const socketServer = new Server( httpServer); //socket del lado del servidor

socketServer.on("connection",(socket) => { //esta esperando que escuche algo
    console.log("nuevo cliente conectado");

    socket.on("message", (data) =>{ //espera que el cliente emita el mensaje (index.js)
        console.log(data);
    })
}) //la palabra connection es una palabra reservada de socket.io para hacer referencia a cuando un cliente se conecta /// esto es del lado del servidor
//el message no es palabra reservada pero tiene que ser igual de ambos lados del serv y del cliente


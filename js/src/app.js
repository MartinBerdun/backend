import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import handelbars from "express-handlebars";
import __dirname from "./utils.js"; 
import viewsRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import database from "./db.js";
import userRouter from "./routes/user.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import ticketsRouter from "./routes/ticket.router.js";

import { errorMiddleware } from "./middlewares/error.js";

/* import { addLogger } from "./utils/logger.js";
 */import loggerRouter from "./routes/logger.router.js"

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import config from "./config/config.js";

const {DB_PORT} = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());


//Passport
initializePassport();
/* app.use(passport.initialize());
 */// app.use(passport.session());

/* app.use(addLogger);
 */
const swaggerOPtions = {
  definition :{
      openapi : "3.0.1" ,//hace referencia a la version del estandar de la documentacion a usar
      info: {
          title: "Adopt Me API",
          description: "Documentacíon que soporta al sistema Adopt Me",
      },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
}

const spec = swaggerJSDoc(swaggerOPtions)

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

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

const httpServer = app.listen(DB_PORT, () => {
  console.log(DB_PORT);
  console.log("Listening on port 8080");
});

database.connect();

/* socket.connect(httpServer);
 */
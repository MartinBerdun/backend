import express from 'express';
import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => {
    console.log("Server runing at port 8080");
});



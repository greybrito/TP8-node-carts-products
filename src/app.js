import express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

//mi middleware a nivel de endpoint
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

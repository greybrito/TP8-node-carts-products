import { Router } from "express";
import fs from "fs";
import path from "path";

const productosFilePath = path.resolve("data", "productos.json");

const router = Router();

// Inicializacion products
let products = [];

// Endpoints
//GET ALL
router.get("/", (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : false;
  fs.readFile(productosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al leer el archivo" });
      return;
    }
    if (limit) {
      data = JSON.parse(data).slice(0, limit);
    }
    res.send(JSON.parse(data));
  });
});

//GET by ID
router.get("/:pId", (req, res) => {
  let productId = parseInt(req.params.pId);
  fs.readFile(productosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al leer el archivo" });
      return;
    }

    console.log(`Buscando producto por id: ${productId}`);
    const product = JSON.parse(data).find(
      (product) => product.id === productId
    );

    if (!product) {
      return res
        .status(404)
        .send({ status: "info", error: "producto no encontrado" });
    }
    res.send(product);
  });
});

//POST
router.post("/", (req, res) => {
  let product = req.body;

  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category
  ) {
    return res
      .status(403)
      .send({ message: "Valores incompletos para el registro" });
  } else {
    if (products.length > 0) {
      product.id = Math.max(...products.map((product) => product.id)) + 1;
    } else {
      product.id = 1;
    }
    console.log(`ID: ${product.id}`);
    products.push(product);
    fs.writeFile(
      productosFilePath,
      JSON.stringify(products, null, 2),
      (err) => {
        if (err) {
          console.log("error: ", err);
          res.status(500).json({ error: "Error al escribir en el archivo" });
          return;
        }
        res.send({
          status: "success",
          msg: `Producto Creado! id: ${product.id}`,
        });
      }
    );
  }
});

// PUT
router.put("/:pid", (req, res) => {
  let productId = parseInt(req.params.pid);
  let productUpdate = req.body;

  fs.readFile(productosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al leer el archivo" });
      return;
    }

    products = JSON.parse(data);

    console.log(`Buscando producto por id: ${productId}`);
    const productPosition = products.findIndex(
      (product) => product.id === productId
    );

    if (productPosition < 0) {
      return res
        .status(404)
        .send({ status: "info", error: "producto no encontrado" });
    }
    console.log("Producto encontrado para modificar:");
    console.log(products[productPosition]);

    products[productPosition] = productUpdate;
    products[productPosition].id = productId;

    fs.writeFile(
      productosFilePath,
      JSON.stringify(products, null, 2),
      (err) => {
        if (err) {
          console.log("error: ", err);
          res.status(500).json({ error: "Error al escribir en el archivo" });
          return;
        }
        res.send({
          status: "success",
          msg: "Producto Actualizado!",
          payload: products[productPosition],
        });
      }
    );
  });
});

// DELETE
router.delete("/:pid", (req, res) => {
  let productId = parseInt(req.params.pid);

  fs.readFile(productosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al leer el archivo" });
      return;
    }
    products = JSON.parse(data);
  });

  console.log(`Buscando producto a eliminar por id: ${productId}`);
  const productPosition = products.findIndex((u) => u.id === productId);
  if (productPosition < 0) {
    return res
      .status(404)
      .send({ status: "info", error: "Producto no encontrado" });
  }

  console.log(
    `Producto encontrado para eliminar: ${JSON.stringify(
      products[productPosition]
    )}`
  );

  products.splice(productPosition, 1);

  fs.writeFile(productosFilePath, JSON.stringify(products, null, 2), (err) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).json({ error: "Error al escribir en el archivo" });
      return;
    }
    res.send({
      status: "success",
      msg: `Producto eliminado! id: ${productId}`,
    });
  });
});

//exportamos router
export default router;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Modal/productModel");

dotenv.config({ path: "./config.env" });
app.use(express.json());

const PORT = process.env.PORT;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

app.get("/", (req, res) => {
  res.send("home page");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log(`db connected`);
    app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

/// add products detail
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
/// to get product data
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// to get a unique product by id

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/// update
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).send(`we cannot find the product bering id ${id}`);
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).send(`we cannot find the product bering id ${id}`);
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

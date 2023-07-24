const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const ProductRoutes = require("./routes/productRoutes");

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
app.use("/products", ProductRoutes);

// to handle unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

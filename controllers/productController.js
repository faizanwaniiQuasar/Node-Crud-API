const Product = require("../models/productModel");
module.exports = {
  add: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
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
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndDelete(id, req.body);
      if (!product) {
        res.status(404).send(`we cannot find the product bering id ${id}`);
      }

      res.status(204).send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

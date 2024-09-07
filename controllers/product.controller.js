const jwt = require("jsonwebtoken");
const productModel = require("../models/product.model");
// To add a product by admin 
const addProductByAdmin = async (req, res) => {
  try {
    const { name, brand, category, price, stock } = req.body;
    if (
      !name ||
      !brand ||
      !category ||
      typeof price !== "number" ||
      typeof stock !== "number"
    ) {
      return res
        .status(400)
        .json({ message: `Please provide all fields properly.` });
    }
    if (isNaN(price) || isNaN(stock)) {
      return res
        .status(400)
        .json({ message: `Price and stock must be valid numbers.` });
    }
    if (price < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: `Price and stock must be positive number.` });
    }
    const product = await productModel.create({
      name,
      brand,
      category,
      price,
      stock,
    });
    if (!product) {
      return res.status(400).json({ message: `Failed to insert the product.` });
    }
    res.status(201).json({ message: "Successfully inserted.", data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

// To get all products 
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(404).json({ message: `Product not found.` });
    }
    res.status(200).json({ message: "Success", data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

module.exports = { addProductByAdmin, getAllProducts };

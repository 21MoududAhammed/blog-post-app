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

// to get a product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve product by id
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product is not found." });
    }
    res.status(200).json({ message: "Success", data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server side error." });
  }
};

// to update a product details by admin
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, price, stock } = req.body;
    // Check if all fields exist properly
    if (
      !name ||
      !brand ||
      !category ||
      typeof price !== "number" ||
      typeof stock !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Please provided all fields properly." });
    }
    // Check if price and stock are valid number
    if (price < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: "Price and stock must be positive numbers." });
    }
    // Check if product exist
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product is not found." });
    }
    // update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        brand,
        category,
        price,
        stock,
      },
      { new: true } // to return updated product
    );

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update product." });
    }
    // send the updated product as response
    res
      .status(200)
      .json({ message: "The product has updated.", data: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server side error." });
  }
};

// to delete a product by admin
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if exists the product
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product is not found." });
    }
    res.status(204).send(); // no content indication successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server side error." });
  }
};

module.exports = {
  addProductByAdmin,
  getAllProducts,
  updateProduct,
  getProductById,
  deleteProduct
};

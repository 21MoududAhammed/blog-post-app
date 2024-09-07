const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");
const {
  addProductByAdmin,
  getAllProducts,
  updateProduct,
  getProductById,
} = require("../controllers/product.controller");

const router = express.Router();

// to insert / add a new product
router.post("/", verifyTokenAndAdmin, addProductByAdmin);
// to get all products 
router.get("/", verifyToken, getAllProducts);

// to get a product 
router.get("/:id", verifyToken, getProductById )

// update a product by admin 
router.put("/:id", verifyTokenAndAdmin, updateProduct)

module.exports = router;

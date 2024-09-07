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
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

// to insert / add a new product
router.post("/", verifyTokenAndAdmin, addProductByAdmin);
// to get all products
router.get("/", verifyToken, getAllProducts);

// to get a product
router.get("/:id", verifyToken, getProductById);

// update a product by admin
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// delete a product by admin
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

module.exports = router;

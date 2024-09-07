const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");
const {
  addProductByAdmin,
  getAllProducts,
} = require("../controllers/product.controller");

const router = express.Router();

// to insert / add a new product
router.post("/", verifyTokenAndAdmin, addProductByAdmin);
// to get all products 
router.get("/", verifyToken, getAllProducts);


module.exports = router;

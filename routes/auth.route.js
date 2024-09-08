const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/auth.controller");

const router = express.Router();
//  to register or sign up a user
router.post("/register", register);

// to login or sign in a user
router.post("/login", login);
// to get all users 
router.get("/all", getAllUsers);

module.exports = router;

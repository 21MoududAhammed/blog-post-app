const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();
//  to register or sign up a user
router.post("/register", register);

// to login or sign in a user
router.post("/login", login);

module.exports = router;

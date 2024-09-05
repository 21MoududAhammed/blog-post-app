const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const router = express.Router();
//  to register or sign up a user 
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const existingUser = await userModel.findOne({ email });
    // if the user exists
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User already exists with this email.` });
    }
    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    // insert to the db
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      isAdmin,
    });
    if (!user) {
      return res.status(400).json({ message: "User has not created." });
    }
    // extract all user info except password  to send
    const { password: _, ...userInfo } = user._doc;
    res
      .status(201)
      .json({ message: "User Created Successfully!", data: userInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

module.exports = router;

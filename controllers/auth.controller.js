const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// controller to register
const register = async (req, res) => {
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
};

// controller to login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // does user exist
    const user = await userModel.findOne({ email }).populate('products');
    if (!user) {
      return res.status(404).json({ message: `Invalid Credentials!` });
    }
    const { password: hashPassword, _id, ...userInfo } = user?._doc;

    // compare the credential
    const isMatch = await bcrypt.compare(password, hashPassword);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }
    // generate jwt token
    const token = await jwt.sign({ email, _id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // logged in done
    res.status(200).json({
      message: "Successfully Logged in ",
      token,
      data: { _id, ...userInfo },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("products");
    if (!users) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.status(200).json({ message: "Success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server side error." });
  }
};

module.exports = { register, login , getAllUsers};

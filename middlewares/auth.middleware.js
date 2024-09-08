const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// to verify jwt token for ordinary users
const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // check if authorization header exists
    if (!authorization) {
      return res.status(401).json({ message: `Authorization header missing.` });
    }
    // Extract the authorization token from the authorization headers
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: `Token is missing.` });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: `Invalid Token!` });
    }
    // attach user info to the request
    req.email = decoded?.email;
    req._id = decoded?._id;
    next();
  } catch (err) {
    console.log(err);
    // specific error handling for jwt
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: `Token expired.` });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: `Invalid token.` });
    }
    // default error handling
    res
      .status(500)
      .json({ message: `Authentication failed due to server error.` });
  }
};

// to verify token and admin for admin
const verifyTokenAndAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // check if authorization token exists
    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Authorization headers missing." });
    }
    // Extract token from authorization headers
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing." });
    }
    // verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Retrieve user
    const email  = decoded?.email;
    const user = await userModel.findOne({ email });
    // check if user exists
    if (!user) {
      return res.status(404).json({ message: `User is not found.` });
    }
    //  check the user is an admin
    if (user.isAdmin !== true) {
      return res.status(403).json({ message: `Access denied. Admins only.` });
    }
    // Attach the user to the request
    req.user = {email: decoded.email, id: decoded._id};
    next();
  } catch (err) {
    console.log(err);
    // Specific error handling for jwt
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    res.status(500).json({ message: `Authentication failed for server error` });
  }
};

module.exports = { verifyToken, verifyTokenAndAdmin };

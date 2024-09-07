const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
dotenv.config();
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

const startServer = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

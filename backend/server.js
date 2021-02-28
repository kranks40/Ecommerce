import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from 'path';

import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();
const app = express();
//we need to parse the body of the http request
//by adding these two middleware all request to data would be translated
//to the application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
//path.resolve return current folder, it would be save in the _dirname, then it's used to concatenate the current folder to the uploads folder.
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

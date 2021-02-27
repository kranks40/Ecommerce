import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import express from "express";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.removed({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample name' + Date.now(),
      category: 'sample category',
      image: '/images/p1.jpg',
      price: 0,
      countInStock: 0,
      brand: 'sample brand',
      rating: 4.5,
      numReviews: 10,
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

export default productRouter;

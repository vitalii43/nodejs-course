import express, { Request, Response, NextFunction } from "express";
import { productsRouter, cartRouter } from "./controllers";
import { auth } from "./auth";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Product } from "./models/product";

const app = express();
const PORT = 8000;

const uri: string = "mongodb://localhost:27017/shop";

app.use(auth);
app.use(bodyParser.json());
app.use("/api/products", productsRouter);
app.use("/api/profile/cart", cartRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500);
  res.send({
    data: null,
    error: {
      message: "Internal Server error",
    },
  });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });

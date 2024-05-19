import express from "express";
import { getProductList, getProduct } from "../services";
import { AplicationErrorList, ApplicationError } from "../utils";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await getProductList();
  res.send({ data: products, error: null });
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ data: product, error: null });
  } catch (err) {
    if (!(err instanceof ApplicationError)) {
      throw err;
    }

    if (err.errorCode === AplicationErrorList.ProductNotFound) {
      res.status(404).send({
        data: null,
        error: {
          message: "No product with such id",
        },
      });
    }
  }
});

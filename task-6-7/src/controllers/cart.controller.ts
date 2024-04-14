import express from "express";
import {
  checkoutService,
  emptyCartService,
  getCartService,
  updateCartLineService,
} from "../services";
import { AplicationErrorList, ApplicationError } from "../utils";
import { cartlineUpdatePayloadValidation } from "./validations";

export const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const cart = await getCartService(req.userId);
  res.send({ data: cart, error: null });
});

cartRouter.put("/", cartlineUpdatePayloadValidation, async (req, res) => {
  try {
    const cart = await updateCartLineService(req.userId, req.body);
    res.send({ data: cart, error: null });
  } catch (err) {
    if (!(err instanceof ApplicationError)) {
      throw err;
    }

    switch (err.errorCode) {
      case AplicationErrorList.ProductNotFound:
        res.status(400).send({
          data: null,
          error: {
            message: "Products are not valid",
          },
        });
        break;
      case AplicationErrorList.CartNotFound:
        res.status(404).send({
          data: null,
          error: {
            message: "Cart was not found",
          },
        });
        break;
      default:
        throw err;
    }
  }
});

cartRouter.delete("/", async (req, res) => {
  await emptyCartService(req.userId);
  res.send({
    data: {
      success: true,
    },
    error: null,
  });
});

cartRouter.post("/checkout", async (req, res) => {
  try {
    const order = await checkoutService(req.userId);
    res.send({
      data: {
        order,
      },
      error: null,
    });
  } catch (err) {
    if (!(err instanceof ApplicationError)) {
      throw err;
    }

    if (err.errorCode === AplicationErrorList.CartIsEmpty) {
      res.status(404).send({
        data: null,
        error: {
          message: "Cart is empty",
        },
      });
    }
  }
});

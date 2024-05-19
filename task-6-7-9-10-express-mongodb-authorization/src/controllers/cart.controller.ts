import express from "express";
import {
  checkoutService,
  emptyCartService,
  getCartService,
  updateCartLineService,
} from "../services";
import { AplicationErrorList, ApplicationError } from "../utils";
import { cartlineUpdatePayloadValidation } from "./validations";
import { isAuthor } from "../middlewares";

export const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const cart = await getCartService(req.user.id);
  res.send({ data: cart, error: null });
});

cartRouter.put("/", cartlineUpdatePayloadValidation, async (req, res) => {
  try {
    console.log("req.user 000", req.user);
    const cart = await updateCartLineService(req.user.id, req.body);
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

cartRouter.delete("/:id", isAuthor, async (req, res) => {
  await emptyCartService(req.params.id);
  res.send({
    data: {
      success: true,
    },
    error: null,
  });
});

cartRouter.post("/checkout", async (req, res) => {
  try {
    const order = await checkoutService(req.user.id);
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

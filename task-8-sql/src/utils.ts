import { wrap } from "@mikro-orm/core";
import { Cart, Order } from "./entities";

export enum AplicationErrorList {
  ProductNotFound,
  CartNotFound,
  CartIsEmpty,
  UserNotFound,
}

type ApplicationErrorOptions = {
  errorCode: AplicationErrorList;
  message?: string;
};

export class ApplicationError extends Error {
  errorCode: AplicationErrorList;
  constructor({ message, errorCode }: ApplicationErrorOptions) {
    super(message ?? "");
    this.errorCode = errorCode;
  }
}

export const getCartTotal = async (cart: Cart) => {
  if (cart.items) {
    await wrap(cart.items).init();
  }

  return cart.items?.reduce(
    (total, { product, count }) => total + product.price * count,
    0
  );
};

export const getOrderTotal = async (cart: Order) => {
  if (cart.items) {
    await wrap(cart.items).init();
  }

  return cart.items?.reduce(
    (total, { price, count }) => total + price * count,
    0
  );
};

import { Cart } from "./types";

export enum AplicationErrorList {
  ProductNotFound,
  CartNotFound,
  CartIsEmpty,
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

export const getTotal = (cart: Cart) => {
  return cart.items?.reduce(
    (total, { product, count }) => total + product.price * count,
    0
  );
};

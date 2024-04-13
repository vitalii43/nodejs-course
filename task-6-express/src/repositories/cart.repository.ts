import { v4 as uuidv4 } from "uuid";
import { getProductById } from "./product.repository";
import { Cart, CartlineUpdateOptions } from "../types";
import { ApplicationError, AplicationErrorList } from "../utils";

const carts: Cart[] = [];

export const createCart = (userId: string) => {
  const cart = {
    id: uuidv4(),
    userId: userId,
    items: [],
  };
  carts.push(cart);
  return cart;
};

export const getCart = (userId: string) => {
  return carts.find((cart) => cart.userId === userId);
};

export const updateCartLine = (
  userId: string,
  { productId, count }: CartlineUpdateOptions
) => {
  const cart = getCart(userId);
  if (!cart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartNotFound,
    });
  }

  let cartlineExist = false;
  cart.items.forEach((cartLine) => {
    if (cartLine.product.id === productId) {
      cartlineExist = true;
      cartLine.count = count;
    }
  });

  if (!cartlineExist) {
    const product = getProductById(productId);

    if (!product) {
      throw new ApplicationError({
        errorCode: AplicationErrorList.ProductNotFound,
      });
    }

    cart?.items.push({
      product,
      count,
    });
  }

  return cart;
};

export const emptyCart = (userId: string) => {
  const cart = getCart(userId);
  if (cart) {
    cart.items = [];
  }

  return cart;
};

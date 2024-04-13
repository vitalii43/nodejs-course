import {
  getCart,
  createCart,
  updateCartLine,
  emptyCart,
  createOrder,
} from "../repositories";
import { Cart, CartlineUpdateOptions } from "../types";
import { AplicationErrorList, ApplicationError, getTotal } from "../utils";

const getPartialCart = (cart: Cart) => {
  const { userId, ...partialCart } = cart;
  return partialCart;
};

export const getCartService = async (userId: string) => {
  const cart = getCart(userId);

  if (!cart) {
    return {
      cart: getPartialCart(createCart(userId)),
      total: 0,
    };
  }

  return {
    cart: getPartialCart(cart),
    total: getTotal(cart),
  };
};

export const updateCartLineService = async (
  userId: string,
  options: CartlineUpdateOptions
) => {
  const cart = getCart(userId);

  if (!cart) {
    createCart(userId);
  }

  const newCart = updateCartLine(userId, options);
  return {
    cart: getPartialCart(newCart),
    total: getTotal(newCart),
  };
};

export const emptyCartService = async (userId: string) => {
  emptyCart(userId);
};

export const checkoutService = async (userId: string) => {
  const cart = getCart(userId);

  if (!cart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  const newOrder = createOrder(userId, cart);
  emptyCart(cart.userId);
  return newOrder;
};

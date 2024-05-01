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
  const cart = await getCart(userId);

  if (!cart) {
    return {
      cart: getPartialCart((await createCart(userId)).toObject()),
      total: 0,
    };
  }

  return {
    cart: getPartialCart(cart.toObject()),
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

  const newCart = await updateCartLine(userId, options);

  if (!newCart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartNotFound,
    });
  }

  return {
    cart: getPartialCart(newCart.toObject()),
    total: getTotal(newCart),
  };
};

export const emptyCartService = async (userId: string) => {
  await emptyCart(userId);
};

export const checkoutService = async (userId: string) => {
  const cart = await getCart(userId);

  if (!cart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  const newOrder = await createOrder(userId, cart);
  await emptyCart(cart.userId);
  return newOrder;
};

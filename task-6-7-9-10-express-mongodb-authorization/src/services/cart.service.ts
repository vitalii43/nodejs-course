import {
  getCart,
  createCart,
  updateCartLine,
  emptyCartByUserId,
  emptyCartById,
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
  const cart = await getCart(userId);

  if (!cart) {
    console.log(111, userId);
    await createCart(userId);
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

export const emptyCartService = async (cartId: string) => {
  await emptyCartById(cartId);
};

export const checkoutService = async (userId: string) => {
  const cart = await getCart(userId);

  if (!cart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  const newOrder = await createOrder(userId, cart);
  await emptyCartByUserId(cart.userId);
  return newOrder;
};

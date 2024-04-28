import {
  getCart,
  createCart,
  updateCartLine,
  emptyCart,
  createOrder,
} from "../repositories";
import { CartlineUpdateOptions } from "../types";
import { Cart } from "../entities";
import {
  AplicationErrorList,
  ApplicationError,
  getCartTotal,
  getOrderTotal,
} from "../utils";
import { wrap } from "@mikro-orm/core";

const getPartialCart = async (cart: Cart) => {
  if (cart.items) {
    await wrap(cart.items).init();
  }

  return {
    id: cart.id,
    items: cart.items?.map(({ cart, ...item }) => item),
  };
};

export const getCartService = async (userId: string) => {
  const cart = await getCart(userId);

  if (!cart) {
    const cart = await createCart(userId);

    return {
      cart: {
        id: cart.id,
        items: [],
      },
      total: 0,
    };
  }

  return {
    cart: await getPartialCart(cart),
    total: await getCartTotal(cart),
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
    cart: await getPartialCart(newCart),
    total: await getCartTotal(newCart),
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

  const newOrder = await createOrder(cart);
  const { user, ...partialOrder } = newOrder;
  await emptyCart(cart.user.id);

  const mappedOrder = {
    ...partialOrder,
    items: newOrder.items.map(({ order, ...item }) => item),
    total: await getOrderTotal(newOrder),
  };

  return mappedOrder;
};

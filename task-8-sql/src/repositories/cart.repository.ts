import { getProductById } from "./product.repository";
import { CartlineUpdateOptions } from "../types";
import { ApplicationError, AplicationErrorList } from "../utils";
import { Cart, CartLine, User } from "../entities";
import { DI } from "..";

export const createCart = async (userId: string) => {
  const user = await DI.em.findOne(User, userId);

  if (!user) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.UserNotFound,
    });
  }

  const newCart = new Cart(user);
  await DI.em.persist(newCart).flush();

  return newCart;
};

export const getCart = async (userId: string) => {
  try {
    return await DI.em.findOne(
      Cart,
      { user: userId },
      { populate: ["items", "user", "items.product"] }
    );
  } catch (err) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartNotFound,
    });
  }
};

export const updateCartLine = async (
  userId: string,
  { productId, count }: CartlineUpdateOptions
) => {
  const cart = await getCart(userId);
  const cartLine = await DI.em.findOne(
    CartLine,
    { cart, product: productId },
    { populate: ["product"] }
  );

  if (!cart) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartNotFound,
    });
  }

  if (!cartLine) {
    const product = await getProductById(productId);

    if (!product) {
      throw new ApplicationError({
        errorCode: AplicationErrorList.ProductNotFound,
      });
    }

    const newCartLine = new CartLine(cart, product, count);
    DI.em.persist(newCartLine);
  } else {
    cartLine.count = count;
  }

  await DI.em.flush();
  return cart;
};

export const emptyCart = async (userId: string) => {
  const cart = await getCart(userId);

  DI.em.nativeDelete(CartLine, {
    cart,
  });

  return cart;
};

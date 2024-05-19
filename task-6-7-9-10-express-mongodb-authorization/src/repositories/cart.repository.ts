import { getProductById } from "./product.repository";
import { CartlineUpdateOptions } from "../types";
import { ApplicationError, AplicationErrorList } from "../utils";
import { Cart } from "../models";

export const createCart = async (userId: string) => {
  const newCart = new Cart({
    userId: userId,
    items: [],
  }).save();

  return newCart;
};

export const getCart = async (userId: string) => {
  try {
    return await Cart.findOne({ userId });
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

  let cartlineExist = cart?.items.some(
    ({ product }) => product.id === productId
  );

  if (!cartlineExist) {
    const product = await getProductById(productId);

    if (!product) {
      throw new ApplicationError({
        errorCode: AplicationErrorList.ProductNotFound,
      });
    }
    return await Cart.findOneAndUpdate(
      { userId: userId },
      { $push: { items: { product, count } } },
      { new: true }
    );
  } else {
    return await Cart.findOneAndUpdate(
      { userId: userId, "items.product._id": productId },
      { $set: { "items.$.count": count } },
      { new: true }
    );
  }
};

export const emptyCartByUserId = async (userId: string) => {
  const cart = await Cart.updateOne({ userId }, { $set: { items: [] } });
  return cart;
};

export const emptyCartById = async (cartId: string) => {
  const cart = await Cart.updateOne({ _id: cartId }, { $set: { items: [] } });
  return cart;
};

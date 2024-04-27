import { OrderStatus } from "../constants";
import { Cart } from "../types";
import { AplicationErrorList, ApplicationError, getTotal } from "../utils";
import { Order } from "../models";

export const createOrder = async (userId: string, cart: Cart) => {
  if (!cart.items.length) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  return await new Order({
    userId: userId,
    cartId: cart._id,
    items: cart.items,
    payment: {
      type: "paypal",
      address: "-",
      creditCard: "-",
    },
    delivery: {
      type: "post",
      address: "-",
    },
    comments: "-",
    status: OrderStatus.Created,
    total: getTotal(cart),
  }).save();
};

import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { OrderStatus } from "../constants";
import { Cart, Order } from "../types";
import { AplicationErrorList, ApplicationError, getTotal } from "../utils";

const orders: Order[] = [];

export const createOrder = (userId: string, cart: Cart) => {
  if (!cart.items.length) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  const order = {
    id: uuidv4(),
    userId: userId,
    cartId: cart.id,
    items: cloneDeep(cart.items),
    payment: {
      type: "paypal",
      address: "",
      creditCard: "",
    },
    delivery: {
      type: "post",
      address: "",
    },
    comments: "",
    status: OrderStatus.Created,
    total: getTotal(cart),
  };

  orders.push(order);

  return order;
};

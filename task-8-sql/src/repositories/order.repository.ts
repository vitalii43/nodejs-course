import { OrderStatus } from "../constants";
import { Cart, Order, OrderLine } from "../entities";
import { AplicationErrorList, ApplicationError, getCartTotal } from "../utils";
import { DI } from "..";

export const createOrder = async (cart: Cart) => {
  if (!cart.items?.length) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.CartIsEmpty,
    });
  }

  const newOrder = new Order(cart.user, {
    deliveryAddress: "-",
    creditCard: "-",
    comments: "-",
    status: OrderStatus.Created,
  });

  DI.em.persist(newOrder);

  for (let cartLine of cart.items) {
    const orderLine = new OrderLine(newOrder, cartLine.product, cartLine.count);
    newOrder.items.add(orderLine);
  }

  await DI.em.flush();

  return newOrder;
};

import { OrderStatus } from "./constants";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type CartLine = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartLine[];
};

export type CartlineUpdateOptions = {
  productId: string;
  count: number;
};

export type Order = {
  id: string;
  userId: string;
  cartId: string;
  items: CartLine[];
  payment: {
    type: string;
    address: string;
    creditCard: string;
  };
  delivery: {
    type: string;
    address: string;
  };
  comments: string;
  status: OrderStatus;
  total: number;
};

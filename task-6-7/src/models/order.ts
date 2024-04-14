import mongoose, { Schema } from "mongoose";
import { Order as IOrder } from "../types";
import { CartLineSchema } from "./cart";

const PaymentSchema: Schema = new Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
  creditCard: { type: String, required: true },
});

const DeliverySchema: Schema = new Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
});

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: [{ type: CartLineSchema, required: true }],
  payment: { type: PaymentSchema, required: true },
  delivery: { type: DeliverySchema, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

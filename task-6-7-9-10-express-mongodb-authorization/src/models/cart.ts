import mongoose, { Schema } from "mongoose";
import { Cart as ICart } from "../types";
import { ProductSchema } from "./product";

export const CartLineSchema: Schema = new Schema({
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true },
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [{ type: CartLineSchema, required: true }],
});

export const Cart = mongoose.model<ICart>("Cart", CartSchema);

import mongoose, { Schema, Document } from "mongoose";
import { Product as IProduct } from "../types";

export const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);

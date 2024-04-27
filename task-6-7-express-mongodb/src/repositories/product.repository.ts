import { Product } from "../models";
import { AplicationErrorList, ApplicationError } from "../utils";

export const getProducts = async () => {
  const products = await Product.find();
  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await Product.findOne({ _id: productId });
    return product;
  } catch (err) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.ProductNotFound,
    });
  }
};

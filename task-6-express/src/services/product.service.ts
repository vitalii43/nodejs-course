import {
  getProducts as getProductsFromDB,
  getProductById,
} from "../repositories";
import { AplicationErrorList, ApplicationError } from "../utils";

export const getProductList = async () => {
  return getProductsFromDB();
};

export const getProduct = async (productId: string) => {
  const product = getProductById(productId);
  if (!product) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.ProductNotFound,
    });
  }
  return product;
};

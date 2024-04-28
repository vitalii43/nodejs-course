import { Product } from "../entities";
import { AplicationErrorList, ApplicationError } from "../utils";
import { DI } from "../index";

export const getProducts = async () => {
  const products = await DI.em.findAll(Product);
  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await DI.em.findOne(Product, productId);
    return product;
  } catch (err) {
    throw new ApplicationError({
      errorCode: AplicationErrorList.ProductNotFound,
    });
  }
};

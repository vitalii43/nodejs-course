import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const cartlineUpdatePayloadSchema = Joi.object({
  productId: Joi.string().not().empty(),
  count: Joi.number().min(0).max(99),
});

export const cartlineUpdatePayloadValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await cartlineUpdatePayloadSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({
      data: null,
      error: {
        message: "You must specify productId and count from 0 to 99",
      },
    });
  }
};

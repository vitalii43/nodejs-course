import { Request, Response, NextFunction } from "express";
import { isUserExist } from "./repositories";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers["x-user-id"];
  if (!userId || typeof userId !== "string") {
    return res.status(401).send({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  }

  isUserExist(userId).then((isExist) => {
    if (!isExist) {
      return res.status(403).send({
        data: null,
        error: {
          message: "You must be authorized user",
        },
      });
    }

    req.userId = userId;
    next();
  });
};

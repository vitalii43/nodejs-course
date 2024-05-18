import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
dotenv.config();
import { productsRouter, cartRouter, authRouter } from "./controllers";
import { auth } from "./middlewares";
import bodyParser from "body-parser";
import { connect } from "./database";

(async () => {
  const port = process.env.APP_PORT ?? 8080;
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/auth", authRouter);
  app.use(auth);
  app.use("/api/products", productsRouter);
  app.use("/api/profile/cart", cartRouter);
  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      res.status(500);
      res.send({
        data: null,
        error: {
          message: "Internal Server error",
        },
      });
    }
  );

  await connect();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();

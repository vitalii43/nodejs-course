import * as dotenv from "dotenv";
dotenv.config();
import config from "./mikro-orm.config";
import "@mikro-orm/reflection";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";

import express, { Request, Response, NextFunction } from "express";
import { productsRouter, cartRouter } from "./controllers";
import { auth } from "./auth";
import bodyParser from "body-parser";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Product } from "./entities/product.entity";
import { CartLine } from "./entities/cart-line.entity";
import { Cart } from "./entities/cart.entity";
import { User } from "./entities/user.entity";

const PORT = 8000;

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  productRepository: EntityRepository<Product>;
  cartRepository: EntityRepository<Cart>;
  cartLineRepository: EntityRepository<CartLine>;
  userRepository: EntityRepository<User>;
};

(async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.cartLineRepository = DI.orm.em.getRepository(CartLine);
  DI.userRepository = DI.orm.em.getRepository(User);

  const app = express();

  app.use(bodyParser.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
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

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

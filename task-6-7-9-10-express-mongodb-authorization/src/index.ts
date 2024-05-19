import dotenv from "dotenv";
import express, { Request, Response, NextFunction, Application } from "express";
import mongoose from "mongoose";
dotenv.config();
import { productsRouter, cartRouter, authRouter } from "./controllers";
import { auth } from "./middlewares";
import bodyParser from "body-parser";
import { connect } from "./database";
import { Socket } from "net";
import { logger } from "./logger";
import expressWinston from "express-winston";

(async () => {
  const port = process.env.APP_PORT ?? 8080;
  const app = express();

  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      msg: (req: Request, res: Response) => {
        const duration = Date.now() - (req as any)._startTime;
        return `${req.method} ${req.url} - ${duration}ms`;
      },
      meta: false,
      expressFormat: false,
      colorize: false,
    })
  );

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

  app.get("/health", async (req, res) => {
    try {
      // Check MongoDB connection
      if (mongoose.connection.readyState === 1) {
        // 1 means connected
        res.status(200).send("OK");
      } else {
        res.status(500).send("Error connecting to database");
      }
    } catch (error) {
      res.status(500);
    }
  });

  const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  let connections: Socket[] = [];

  server.on("connection", (connection) => {
    connections.push(connection);
    connection.on("close", () => {
      connections = connections.filter(
        (currentConnection) => currentConnection !== connection
      );
    });
  });

  const shutdown = () => {
    server.close(() => {
      logger.info("Closed out remaining connections");
      process.exit(0);
    });

    setTimeout(() => {
      logger.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 20000);

    connections.forEach((connection) => connection.end());

    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();

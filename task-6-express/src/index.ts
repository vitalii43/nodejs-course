import express, { Request, Response, NextFunction } from "express";
import { productsRouter, cartRouter } from "./controllers";
import { auth } from "./auth";
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

app.use(auth);
app.use(bodyParser.json());
app.use("/api/products", productsRouter);
app.use("/api/profile/cart", cartRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500);
  res.send({
    data: null,
    error: {
      message: "Internal Server error",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

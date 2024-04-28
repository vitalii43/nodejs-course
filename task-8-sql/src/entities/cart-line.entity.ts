import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import * as uuid from "uuid";
import { Product } from "./product.entity";
import { Cart } from "./cart.entity";

@Entity()
export class CartLine {
  @PrimaryKey({ type: "uuid" })
  id!: string;

  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @Property()
  count!: number;

  constructor(cart: Cart, product: Product, count: number) {
    this.id = uuid.v4();
    this.cart = cart;
    this.product = product;
    this.count = count;
  }
}

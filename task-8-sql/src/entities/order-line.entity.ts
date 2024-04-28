import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import * as uuid from "uuid";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderLine {
  @PrimaryKey({ type: "uuid" })
  id: string;

  @ManyToOne(() => Order)
  order!: Order;

  @Property()
  title!: string;

  @Property({ type: "text" })
  description!: string;

  @Property()
  price!: number;

  @Property()
  count!: number;

  constructor(order: Order, product: Product, count: number) {
    this.id = uuid.v4();
    this.order = order;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.count = count;
  }
}

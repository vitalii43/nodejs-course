import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import * as uuid from "uuid";

@Entity()
export class Product {
  @PrimaryKey({ type: "uuid" })
  id!: string;

  @Property()
  title!: string;

  @Property({ type: "text" })
  description!: string;

  @Property()
  price!: number;

  constructor(title: string, description: string, price: number) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

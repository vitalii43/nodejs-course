import { Entity, PrimaryKey, OneToOne, Property } from "@mikro-orm/core";
import * as uuid from "uuid";
import { Cart } from "./cart.entity";

@Entity()
export class User {
  @PrimaryKey({ type: "uuid" })
  id!: string;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  constructor(name: string, email: string, password: string, cart: Cart) {
    this.id = uuid.v4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

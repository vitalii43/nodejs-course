import {
  Entity,
  PrimaryKey,
  OneToMany,
  Collection,
  OneToOne,
} from "@mikro-orm/core";
import * as uuid from "uuid";
import { CartLine } from "./cart-line.entity";
import { User } from "./user.entity";

@Entity()
export class Cart {
  @PrimaryKey({ type: "uuid" })
  id!: string;

  @OneToOne(() => User)
  user!: User;

  @OneToMany(() => CartLine, (cartLine) => cartLine.cart, { nullable: true })
  items?: Collection<CartLine> = new Collection<CartLine>(this);

  constructor(user: User) {
    this.id = uuid.v4();
    this.user = user;
  }
}

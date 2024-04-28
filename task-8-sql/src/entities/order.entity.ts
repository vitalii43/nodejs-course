import {
  Entity,
  PrimaryKey,
  OneToMany,
  Collection,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import * as uuid from "uuid";
import { OrderLine } from "./order-line.entity";
import { User } from "./user.entity";

type OrderInfo = {
  status: string;
  deliveryAddress: string;
  creditCard: string;
  comments?: string;
};

@Entity()
export class Order {
  @PrimaryKey({ type: "uuid" })
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  comments?: string;

  @Property()
  status?: string;

  @Property()
  deliveryAddress?: string;

  @Property()
  creditCard?: string;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  items: Collection<OrderLine> = new Collection<OrderLine>(this);

  constructor(user: User, orderInfo: OrderInfo) {
    this.id = uuid.v4();
    this.user = user;
    this.status = orderInfo.status;
    this.deliveryAddress = orderInfo.deliveryAddress;
    this.creditCard = orderInfo.creditCard;
    this.comments = orderInfo.comments;
  }
}

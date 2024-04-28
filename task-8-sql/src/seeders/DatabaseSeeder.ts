import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, Cart, Product } from "../entities";
import * as uuid from "uuid";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const admin = em.create(User, {
      id: uuid.v4(),
      name: "Jhon Doe",
      email: "jhon@doe.com",
      password: "password123",
    });

    em.create(Cart, {
      id: uuid.v4(),
      user: admin,
    });

    em.create(Product, {
      id: uuid.v4(),
      title: "Pen",
      description: "Cute pen",
      price: 20,
    });

    em.create(Product, {
      id: uuid.v4(),
      title: "Book",
      description: "Interesting Book",
      price: 200,
    });
  }
}

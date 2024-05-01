import { Migration } from '@mikro-orm/migrations';

export class Migration20240428203823 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" uuid not null, "title" varchar(255) not null, "description" text not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "order" ("id" uuid not null, "user_id" uuid not null, "comments" varchar(255) null, "status" varchar(255) null, "delivery_address" varchar(255) null, "credit_card" varchar(255) null, constraint "order_pkey" primary key ("id"));');

    this.addSql('create table "order_line" ("id" uuid not null, "order_id" uuid not null, "title" varchar(255) not null, "description" text not null, "price" int not null, "count" int not null, constraint "order_line_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" uuid not null, "user_id" uuid not null, constraint "cart_pkey" primary key ("id"));');
    this.addSql('alter table "cart" add constraint "cart_user_id_unique" unique ("user_id");');

    this.addSql('create table "cart_line" ("id" uuid not null, "product_id" uuid not null, "cart_id" uuid not null, "count" int not null, constraint "cart_line_pkey" primary key ("id"));');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "order_line" add constraint "order_line_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "cart_line" add constraint "cart_line_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_line" add constraint "cart_line_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
  }

}

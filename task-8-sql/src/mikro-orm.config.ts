import * as dotenv from "dotenv";
dotenv.config();
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  // folder-based discovery setup, using common filename suffix
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  migrations: {
    path: "./dist/migrations", // path to the folder with migrations
    pathTs: "./src/migrations", // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  extensions: [Migrator, SeedManager],
  seeder: {
    path: "./dist/seeders", // path to the folder with seeders
    pathTs: "./src/seeders", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: "DatabaseSeeder", // default seeder class name
    glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: "ts", // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;

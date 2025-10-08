import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "basedatos.sqlite",
  synchronize: true,
  logging: true,
  entities: [
    path.join(__dirname, "/entidades/**/*.ts"),
    path.join(__dirname, "/entidades/**/*.js")
  ],
});

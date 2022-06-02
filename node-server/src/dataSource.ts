import "reflect-metadata"
import { DataSource } from "typeorm";
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST_IP,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    migrationsRun: true,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});
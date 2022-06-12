import "reflect-metadata"
import { DataSource } from "typeorm";
import RedisQueryResultCache from "./RedisQueryResultCache";
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
    entities: ["src/entity/*"],
    migrations: ["src/migration/*"],
    subscribers: [],
    cache: {
        type: "redis",
        provider(_){
            return new RedisQueryResultCache(process.env.REDIS_HOST_IP, 
                parseInt(process.env.REDIS_PORT), process.env.REDIS_PASS);
        }
    }
});
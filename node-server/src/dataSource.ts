import "reflect-metadata"
import { DataSource, BaseEntity } from "typeorm";
import RedisQueryResultCache from "./RedisQueryResultCache";
import {validate} from "class-validator";
require('dotenv').config();

// smart saving injection
const save = BaseEntity.prototype.save;
BaseEntity.prototype.save = async function() {
    console.debug("validation being executed before saving");
    const errors = await validate(this);
    if (errors.length > 0) {
        const msg = errors.reduce((previousValue, currentValue) => previousValue + currentValue.toString(), "");
        throw new Error("wrong input "+ msg);
    }
    return await save.apply(this, arguments);
}

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
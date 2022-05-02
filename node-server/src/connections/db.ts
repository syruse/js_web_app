import { Connection, createConnection } from "typeorm";

export const connectDB = (): Promise<Connection> => {
    return createConnection();
}
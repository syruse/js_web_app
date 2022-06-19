import express from 'express';
import bodyParser from "body-parser";
import { AppDataSource } from './dataSource';
import cors from 'cors';
import router from './router/router';
import { startGrpc, cleanupGrpc } from "./grpc/server";
import establishConnection from "./kafka/debeziumConnector";
import { createKafkaConsumer, connectKafkaConsumer, schemaRegistry } from "./kafka/dbWatcher";

require('dotenv').config();

let server = undefined;

process.on("SIGINT", async () => {
    console.log("Caught interrupt signal");

    if(server) {
        await AppDataSource.destroy();
        server.close(error => {
            console.log("server exited ", error ? 1 : 0);
            cleanupGrpc();
            process.exit(error ? 1 : 0);
        });
    }

})

AppDataSource.initialize().then(async () => {

    console.log("db initializing")

    const port = process.env.PORT;
    const app = express();

    /// grant the access to frontend-server
    app.use(cors({ credentials: true, origin: process.env.FRONTEND}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static("public"));
    app.use('/', router);

    console.log("server is waiting for connection on port :", port)
    server = app.listen(port);

    startGrpc(process.env.GRPC);
    console.log("grpc listening on " + process.env.GRPC);

    establishConnection(process.env.KAFKA_DEBEZIUM);
    console.log("debezium-connector established");

    await connectKafkaConsumer(createKafkaConsumer([process.env.KAFKA_HOST], process.env.KAFKA_GROUP_DB_WATCHER),
        schemaRegistry(process.env.KAFKA_SCHEMA_REGISTRY));

}).catch(error => console.log(error))

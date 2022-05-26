import express from 'express';
import bodyParser from "body-parser";
import { AppDataSource } from './dataSource';
import cors from 'cors';
import router from './router/router';
import { startGrpc, cleanupGrpc } from "./grpc/server"

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

    startGrpc("localhost:" + process.env.GRPC_PORT);
    console.log("grpc listening on " + process.env.GRPC_PORT);


}).catch(error => console.log(error))

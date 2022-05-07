import express from 'express';
import bodyParser from "body-parser";
import { AppDataSource } from './dataSource';
import cors from 'cors';
import router from './router/router';

require('dotenv').config();

AppDataSource.initialize().then(async () => {

    console.log("db initializing")

    const port = process.env.PORT;
    const app = express();

    /// grant the access to frontend-server
    app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static("public"));
    app.use('/', router);

    console.log("server is waiting for connection on port :", port)
    app.listen(port);


}).catch(error => console.log(error))

import * as express from 'express';
import { GeneralController, JwtData } from '../controller/generalController';

require('dotenv').config();

export default async function (request: express.Request, response: express.Response, next: any) {
    console.log(" authorization triggered " + request.headers.authorization);
    if (request.headers.authorization) {
        try {
            const decoded: JwtData = await GeneralController.jwt_verify(request.headers.authorization.split(' ')[1]);
            console.log("payload ", decoded.user);
            (request as any).user = decoded.user;
        } catch (error) {
            console.log(" authorization failed " + error);
        }
    }
    
    next();
};

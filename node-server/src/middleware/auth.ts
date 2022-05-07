import * as express from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

export default function (request: express.Request, response: express.Response, next: any) {
    console.log(" authorization triggered " + request.headers.authorization);
    if (request.headers.authorization) {
        jwt.verify(
            request.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    console.log("err ", err);
                }
                else if ((decoded as any).user) {
                    console.log("payload ", (decoded as any).user);
                    (request as any).user = (decoded as any).user;
                    // fill in with data from db
                }
                /// proceed chain of processing
                next();
            }
        )
    } else {
        next();
    }
};

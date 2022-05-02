import express from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import { AppDataSource } from './dataSource';
import { User } from "./entity/User";
import cors from 'cors';
import * as bcrypt from 'bcrypt';

require('dotenv').config();

const saltOrRounds = 10;

AppDataSource.initialize().then(async () => {

    console.log("db initializing")


    const port = process.env.PORT;
    const app = express();

    /// grant the access to frontend-server
    app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static("public"));

    app.use('/api/', function (req, res, next) {
        console.log(" authorization triggered " + req.headers.authorization);
        if (req.headers.authorization) {
            jwt.verify(
              req.headers.authorization.split(' ')[1],
              process.env.JWT_SECRET,
              (err, decoded) => {
                if(err){
                   console.log("err ", err);
                }
                else if ((decoded as any).user) {
                   console.log("payload ", (decoded as any).user);
                   (req as any).user = (decoded as any).user;
                   // fill in with data from db
                }
                /// proceed chain of processing
                next();
              }
            )
        } else {
            next();
        }
    })

    app.post('/login', async (req, res) => {
        const { email, pass } = req.body;
        console.log("login for " + email)
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        const isMatch = !user ? false : await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            res.sendStatus(401);
            return;
        } else {
            console.log("login succeeded for " + user.email)
            const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET);
            res.send({ token: token, user: { name: user.name, email: user.email} });
        }
    });

    app.post('/register', async (req, res) => {
        const { email, pass, name } = req.body;
        console.log("registeration for " + email)
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        console.debug(user)
        // check whether the email address already registered
        if (user) {
            res.sendStatus(401);
            return;
        } else {
            const hash = await bcrypt.hash(pass, saltOrRounds);
            const user = new User();
            user.email = email;
            user.name = name;
            user.pass = hash;
            await user.save();
            res.send('OK');
            console.log("registration succeeded for " + email)
        }
    });

    app.get('/api/phones', async (req, res) => {
        console.log("/api/phones " + (req as any).user)
        res.send((req as any).user);
    });

    console.log("server is waiting for connection on port :", port)
    app.listen(port);


}).catch(error => console.log(error))

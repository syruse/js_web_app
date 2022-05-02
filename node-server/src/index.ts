import express from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import "reflect-metadata";
import { User } from "./entity/User";
import { connectDB } from './connections/db';

require('dotenv').config();

connectDB()
    .then(() => console.log("DB connection established"))
    .catch((error) => console.error(error));
/*
const user = new User();
user.name = "Yevhen";
user.pass = "pass";
user.email = "email@gmail.com";
user.save();*/

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.post('/login', async (req, res) => {
    const {email, pass} = req.body;
    console.log("login for " + email)
    /*const result = await user.findOne({email: email, pass: pass}).exec();
    if(!result){
        res.sendStatus(401);
        return;
    } else {
        console.log("login succeeded for " + result.email)
        const token = jwt.sign({ user: result }, configValues.jwt.secret);
        res.send({token});
    }*/
});

console.log("server is waiting for connection on port :", port)
app.listen(port);

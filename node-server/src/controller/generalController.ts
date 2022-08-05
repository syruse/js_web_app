import { User } from "../entity/User";
import { Device } from "../entity/Device";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const saltOrRounds = 10;

interface JwtData {
    user: {
        name: string,
        email: string,
        is_admin: boolean
    }
}

class GeneralController {

    static async login(email: string, pass: string): Promise<User|undefined> {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        const isMatch: boolean = !user ? false : await bcrypt.compare(pass, user.pass);

        return isMatch ? user : undefined;
    }

    static async register(email: string, pass: string, name: string): Promise<void> | never {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        // check whether the email address already registered
        if (user) {
            throw new Error("no such user " + email);
        } else {
            const hash = await bcrypt.hash(pass, saltOrRounds);
            const user = new User();
            user.email = email;
            user.name = name;
            user.pass = hash;
            user.date = new Date().toISOString().slice(0, 10); // get only first 10 chars (date only): 2022-07-18T19:01:30.508Z
            try {
                await user.save();
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }

    static jwt_sign(data: JwtData, secret = process.env.JWT_SECRET): string {
        const token = jwt.sign(data, secret);
        return token;
    }

    static jwt_verify(token: string, secret = process.env.JWT_SECRET): Promise<JwtData> {

        if( !token ) {
            throw new Error("jwt decoding wrong token");
        }

        return new Promise((resolve,reject) =>
           jwt.verify(token, secret, (err, decoded) => err ? reject(new Error("jwt decoding failed " + err)) : 
                                                       resolve(decoded as JwtData))
        );
    }

    static async getDevices(): Promise<Device[]> {
        const devices = await Device.find({
            cache: {
                id: "devices",
                milliseconds: 600000 // 10 min
            }
        });
        return devices;
    }

    static async addDevice(body: object): Promise<Device> | never {
        const device = new Device;
        Object.keys(body).forEach(key => {
            console.debug("set property ", key, ": ", body[key]);
            device[key] = body[key];
        });

        try {
            return await device.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export { JwtData, GeneralController };

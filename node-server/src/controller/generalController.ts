import { User } from "../entity/User";
import { Phone } from "../entity/Phone";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const saltOrRounds = 10;

interface JwtData {
    user: {
        name: string,
        email: string
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

    static async register(email: string, pass: string, name: string): Promise<boolean> {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        // check whether the email address already registered
        if (user) {
            return false;
        } else {
            const hash = await bcrypt.hash(pass, saltOrRounds);
            const user = new User();
            user.email = email;
            user.name = name;
            user.pass = hash;
            await user.save();
            return true;
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

    static async getPhones(): Promise<Phone[]> {
        const phones = await Phone.find();
        return phones;
    }

    static async addPhone(model: string, desc: string, price: number): Promise<Phone> {
        const phone = new Phone;
        phone.model = model;
        phone.desc = desc;
        phone.price = price;

        return await phone.save();
    }
}

export { JwtData, GeneralController };

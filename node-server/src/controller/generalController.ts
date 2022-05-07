import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const saltOrRounds = 10;

export default class GeneralController {

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

    static jwt_sign(data: any): string {
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return token;
    }
}

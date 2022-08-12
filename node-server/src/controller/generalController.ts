import { User } from "../entity/User";
import { Device, BrandType, DisplayType, CPUType, StorageType } from "../entity/Device";
import { Category, CategoryType } from "../entity/Category";
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

    static getDevicesConfiguration(): any {
        const devicesConfiguration = {
            category: [],
            brand: [],
            model: '',
            displaySize: { max: 100.0, min: 0.0 },
            displayType: [],
            cpuType: [],
            storageType: [],
            cameraMp: { max: 200.0, min: 0.0 },
            cameraFrontMp: { max: 200.0, min: 0.0 },
            battery_mAh: { max: 1000000.0, min: 0.0 },
            sim: { max: true, min: false },
            price: { max: 1000000.0, min: 0.0 }
        };
        for (let item in CategoryType) {
            devicesConfiguration.category.push(CategoryType[item])
        }
        for (let item in BrandType) {
            devicesConfiguration.brand.push(BrandType[item])
        }
        for (let item in DisplayType) {
            devicesConfiguration.displayType.push(DisplayType[item])
        }
        for (let item in CPUType) {
            devicesConfiguration.cpuType.push(CPUType[item])
        }
        for (let item in StorageType) {
            devicesConfiguration.storageType.push(StorageType[item])
        }
        return devicesConfiguration;
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
        device.brand = BrandType[Object.keys(BrandType)[body['brand']]];
        device.cpuType = CPUType[Object.keys(CPUType)[body['cpuType']]];
        device.displayType = DisplayType[Object.keys(DisplayType)[body['displayType']]];
        device.storageType = StorageType[Object.keys(StorageType)[body['storageType']]];

        try {
            const categoryName = CategoryType[Object.keys(CategoryType)[body['category']]];
            let category = await Category.findOne({
                where: {
                    name: categoryName
                }
            });
            if (!category) {
                category = new Category;
                category.name = categoryName
                category.desc = categoryName
                await category.save();
            }
            device.category = category;
            console.debug("new device added: " + JSON.stringify(device))
            return await device.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export { JwtData, GeneralController };

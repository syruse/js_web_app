import { Device } from "../entity/Device";
import { AppDataSource } from '../dataSource';

export const deviceHandler = ( kafkaMsgValue: any ) => {
    if (kafkaMsgValue && typeof kafkaMsgValue.after !== 'undefined') {
        const device = Object.assign(new Device(), kafkaMsgValue.after);
        console.log("new Device: " + JSON.stringify(device));
        // reset cache
        AppDataSource.queryResultCache?.remove(["devices"]);
    }
}

import { Phone } from "../entity/Phone";
import { AppDataSource } from '../dataSource';

export const phoneHandler = ( kafkaMsgValue: any ) => {
    if (kafkaMsgValue && typeof kafkaMsgValue.after !== 'undefined') {
        const phone = Object.assign(new Phone(), kafkaMsgValue.after);
        console.log("new phone: " + JSON.stringify(phone));
        // reset cache
        AppDataSource.queryResultCache?.remove(["phones"]);
    }
}

import { Phone } from "../entity/Phone";

export const phoneHandler = ( kafkaMsgValue: any ) => {
    if (kafkaMsgValue && typeof kafkaMsgValue.after !== 'undefined') {
        const phone = Object.assign(new Phone(), kafkaMsgValue.after);
        console.log("new phone: " + JSON.stringify(phone));
    }
}

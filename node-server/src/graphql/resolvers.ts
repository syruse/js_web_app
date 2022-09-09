import { Device } from "../entity/Device";
import { AppDataSource } from '../dataSource';

const parseOperation = (operation: string): string => {
    let parsedOperation = ' = ';
    switch (operation) {
        case 'LESS': {
            parsedOperation = ' < ';
            break;
        }
        case 'GREATER': {
            parsedOperation = ' > ';
            break;
        }
        case 'EQ': {
            parsedOperation = ' = ';
            break;
        }
        case 'LE': {
            parsedOperation = ' <= ';
            break;
        }
        case 'GE': {
            parsedOperation = ' >= ';
            break;
        }
        case 'IN': {
            parsedOperation = ' IN ';
            break;
        }
        case 'LIKE': {
            parsedOperation = ' LIKE ';
            break;
        }
        default: {
            break;
        }
    }
    return parsedOperation;
};

export const Query = {
    getProducts: async (root, filters, context) => {
        let query = AppDataSource.getRepository(Device).createQueryBuilder("devices").leftJoinAndSelect("devices.category", "categories");
        
        if (filters.length < 1) {
            console.error("empty filters");
            return undefined;
        }

        filters.forEach(filter => {
            if (filter.values.length < 1) {
                console.warn("no any value for " + filter.field);
                return;
            }
            switch (filter.field) {
                case 'sim': {
                    const sqlQuery: string = "devices.sim " + parseOperation(filter.op) + " (:sim) ";
                    query = query.where(sqlQuery, { sim: filter.values[0].toLowerCase() == 'true' });
                    break;
                }
                case 'price': {
                    const sqlQuery: string = "devices.price " + parseOperation(filter.op) + " (:price) ";
                    query = query.where(sqlQuery, { 
                        price: filter.values.length === 1 ? parseFloat(filter.values[0]) : filter.values.map((value) => parseFloat(value)) 
                    });
                    break;
                }
                default: {
                    console.warn("invalid field " + filter.field);
                    break;
                }
            }
        });

        return await query.getMany();
    }
};

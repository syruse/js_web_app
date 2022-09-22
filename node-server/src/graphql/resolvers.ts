import { Device } from "../entity/Device";
import { AppDataSource } from '../dataSource';

interface IFilter {
    field: string,
    op: string,
    values: string[]
}

interface IFiltersExpression {
    filters: IFilter[]
}

interface IInput {
    filterExpression: IFiltersExpression
}

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
    getProducts: async (root, input:IInput, context) => {

        console.debug("getProducts filter input " + JSON.stringify(input.filterExpression))

        let query = AppDataSource.getRepository(Device).createQueryBuilder("devices").leftJoinAndSelect("devices.category", "categories");
       
        if (input.filterExpression.filters.length < 1) {
            console.error("empty filters");
            return undefined;
        }

        input.filterExpression.filters.forEach(filter => {
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

        console.debug("query " + query.getSql());

        return await query.getMany();
    }
};

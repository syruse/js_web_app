import { Device, BrandType, DisplayType, CPUType, StorageType } from "../entity/Device";
import { AppDataSource } from '../dataSource';
import { UserInputError } from "apollo-server-express";
import { GeneralController } from "../controller/generalController";

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

function generateError(errorMsg: string) {
    console.error(errorMsg);
    throw new UserInputError(errorMsg);
}

function parseOperation(operation: string): string {
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
            generateError('invalid operation ' + operation);
        }
    }
    return parsedOperation;
};

export const Query = {
    getProducts: async (root, input:IInput, context) => {

        console.debug("getProducts filter input " + JSON.stringify(input.filterExpression))

        let query = AppDataSource.getRepository(Device).createQueryBuilder("devices").leftJoinAndSelect("devices.category", "categories");
       
        if (input.filterExpression.filters.length < 1) {
            console.warn("empty filter provided => return all devices by default");
            return await GeneralController.getDevices();
        }

        input.filterExpression.filters.forEach(filter => {
            if (filter.values.length < 1) {
                generateError("no any value for " + filter.field);
            } else if (filter.op !== 'IN' && filter.values.length > 1) {
                generateError("only one value must be provided for operation " + filter.op);
            }
            
            switch (filter.field) {
                case 'sim': {
                    const sqlQuery: string = "devices.sim " + parseOperation(filter.op) + " (:sim) ";
                    query = query.andWhere(sqlQuery, { 
                        sim: filter.values.length === 1 ? filter.values[0].toLowerCase() == 'true' : filter.values.map((value) => value.toLowerCase() == 'true') 
                    });
                    break;
                }
                case 'price': {
                    const sqlQuery: string = "devices.price " + parseOperation(filter.op) + " (:price) ";
                    query = query.andWhere(sqlQuery, { 
                        price: filter.values.length === 1 ? parseFloat(filter.values[0]) : filter.values.map((value) => parseFloat(value)) 
                    });
                    break;
                }
                case 'displaySize': {
                    const sqlQuery: string = "devices.displaySize " + parseOperation(filter.op) + " (:displaySize) ";
                    query = query.andWhere(sqlQuery, { 
                        displaySize: filter.values.length === 1 ? parseFloat(filter.values[0]) : filter.values.map((value) => parseFloat(value)) 
                    });
                    break;
                }
                case 'cameraMp': {
                    const sqlQuery: string = "devices.cameraMp " + parseOperation(filter.op) + " (:cameraMp) ";
                    query = query.andWhere(sqlQuery, { 
                        cameraMp: filter.values.length === 1 ? parseFloat(filter.values[0]) : filter.values.map((value) => parseFloat(value)) 
                    });
                    break;
                }
                case 'cameraFrontMp': {
                    const sqlQuery: string = "devices.cameraFrontMp " + parseOperation(filter.op) + " (:cameraFrontMp) ";
                    query = query.andWhere(sqlQuery, { 
                        cameraFrontMp: filter.values.length === 1 ? parseFloat(filter.values[0]) : filter.values.map((value) => parseFloat(value)) 
                    });
                    break;
                }
                case 'battery_mAh': {
                    const sqlQuery: string = "devices.battery_mAh " + parseOperation(filter.op) + " (:battery_mAh) ";
                    query = query.andWhere(sqlQuery, { 
                        battery_mAh: filter.values.length === 1 ? parseInt(filter.values[0]) : filter.values.map((value) => parseInt(value)) 
                    });
                    break;
                }
                case 'quantity': {
                    const sqlQuery: string = "devices.quantity " + parseOperation(filter.op) + " (:quantity) ";
                    query = query.andWhere(sqlQuery, { 
                        quantity: filter.values.length === 1 ? parseInt(filter.values[0]) : filter.values.map((value) => parseInt(value)) 
                    });
                    break;
                }
                case 'model': {
                    const sqlQuery: string = "devices.model " + parseOperation(filter.op) + " (:model) ";
                    query = query.andWhere(sqlQuery, { 
                        model: filter.values
                    });
                    break;
                }
                case 'brand': {
                    const sqlQuery: string = "devices.brand " + parseOperation(filter.op) + " (:brand) ";
                    query = query.andWhere(sqlQuery, { 
                        brand: filter.values.length === 1 ? BrandType[Object.keys(BrandType)[parseInt(filter.values[0])]]: 
                               filter.values.map((value) => BrandType[Object.keys(BrandType)[parseInt(value)]]) 
                    });
                    break;
                }
                case 'displayType': {
                    const sqlQuery: string = "devices.displayType " + parseOperation(filter.op) + " (:displayType) ";
                    query = query.andWhere(sqlQuery, { 
                        displayType: filter.values.length === 1 ? DisplayType[Object.keys(DisplayType)[parseInt(filter.values[0])]]: 
                               filter.values.map((value) => DisplayType[Object.keys(DisplayType)[parseInt(value)]]) 
                    });
                    break;
                }
                case 'cpuType': {
                    const sqlQuery: string = "devices.cpuType " + parseOperation(filter.op) + " (:cpuType) ";
                    query = query.andWhere(sqlQuery, { 
                        cpuType: filter.values.length === 1 ? CPUType[Object.keys(CPUType)[parseInt(filter.values[0])]]: 
                               filter.values.map((value) => CPUType[Object.keys(CPUType)[parseInt(value)]]) 
                    });
                    break;
                }
                case 'storageType': {
                    const sqlQuery: string = "devices.storageType " + parseOperation(filter.op) + " (:storageType) ";
                    query = query.andWhere(sqlQuery, { 
                        storageType: filter.values.length === 1 ? StorageType[Object.keys(StorageType)[parseInt(filter.values[0])]]: 
                               filter.values.map((value) => StorageType[Object.keys(StorageType)[parseInt(value)]]) 
                    });
                    break;
                }
                default: {
                    generateError("invalid field " + filter.field);
                    break;
                }
            }
        });

        console.debug("query " + query.getSql());

        return await query.getMany();
    }
};

import axios from "axios";
import debeziumConnector from './debezium-connector.json';

class DebeziumConnector {
    constructor(private mEndpoint: string) { }

    async ping(): Promise<any> | undefined {
        return axios.get(this.mEndpoint).then(res => {
            return res.data;
        }).catch(err => {
            console.log("Unable to establish connection over debezium " + err.response.data);
            throw new Error("Unable to establish connection over debezium " + err.response.data);
        });
    }

    async ls(): Promise<Array<string>> | undefined {
        return this.ping().then(() => {
            return axios.get(`${this.mEndpoint}/connectors/`).then(res => {
                return res.data;
            })
        }).catch(err => {
            console.log("Unable to establish connection over debezium " + err);
            return undefined;
        });
    };

    async destroy(name: string): Promise<boolean> {
        return this.ls().then((list?: Array<string>) => {
            if (!list) {
                return true;
            } else if (list.indexOf(name) === -1) {
                return false;
            } else {
                return axios.delete(`${this.mEndpoint}/connectors/${name}`).then(res => {
                    return true;
                });
            }
        });
    };

    async create(data: any) {
        return this.ping().then(async (_) => {
            axios.post(`${this.mEndpoint}/connectors/`, data).then(_ => {
            }).catch(err => {
                console.log("Unable to create debezium connector " + err);
                throw err;
            })
        });
    }

    async establishConnection(connector: any): Promise<void>  {
        if (!connector && typeof connector.user === 'undefined') {
            throw new Error(`Couldn't establish debezium connection: wrong connector ${connector} `);
        }

        try {
            await this.destroy(connector.name);
            await this.create(connector);
        } catch (err) {
            console.log("Unable to create debezium connector " + err);
            throw new Error(`Couldn't establish debezium connection for ${connector.name} : ${err}`);
        }
    }

}

/** 
 * @throws {Error}
 */
export default async function establishConnection(endpoint: string, connector: any = debeziumConnector): Promise<void> {
    return await new DebeziumConnector(endpoint).establishConnection(connector);
}

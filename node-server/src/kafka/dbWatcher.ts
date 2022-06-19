import { Consumer, Kafka, logLevel as kafkaLogLevel } from 'kafkajs';
import { SchemaRegistry, readAVSCAsync } from "@kafkajs/confluent-schema-registry";
import { phoneHandler } from "./phoneHandler";
import debeziumConnector from './debezium-connector.json';

const TOPIC_PHONES_TABLE = debeziumConnector.config['database.server.name'] + ".db.phones";

export const createKafkaConsumer = (hosts:string[], group:string): Consumer => {
    const kafka = new Kafka({
        clientId: 'db_watcher',
        brokers: hosts,
        retry: {
            retries: 3,
        },
        // @ts-ignore
        logCreator: kafkaJsLogger,
    });

    return kafka.consumer({ groupId: group });
}

export const schemaRegistry = (host:string): SchemaRegistry => {
    return new SchemaRegistry({
        host: host,
    });
}

export const connectKafkaConsumer = async (consumer: Consumer, schemaRegistry?: SchemaRegistry): Promise<Consumer> => {
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_PHONES_TABLE, fromBeginning: true });

    /**
     * Run the consumer
     */
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // just for safety
            if (!message.value) {
                return;
            }

            const value = schemaRegistry ? await schemaRegistry.decode(message.value) : JSON.parse(message.value.toString());

            console.log("Received message" + JSON.stringify(value) + " for " + topic)

            try {
                if (topic === TOPIC_PHONES_TABLE) {
                    phoneHandler(value);
                } else {
                    // nothing
                }
            } catch (e) {
                /**
                 * Note: there is functionality built into kafkajs that will retry processing
                 * a message in the event that an error is thrown while doing so.  Wrapping this
                 * in a try catch bypasses that.  If ever we want to take advantage of this functionality,
                 * we need only re-throw the error after catching and logging it.
                 */
                console.error('error', "Error processing message for " + topic + ": " + e.message, {topic});
                console.error('error', 'Problematic message value: ' + message.value.toString(), {topic});
            }

            console.log("log", "Finished processing message for " + topic);
        },
    });

    return consumer;
};

const kafkaJsLogger = (logLevel: string) => (args: { log: { message: string } }) => {
    const kafkaLogLevelToLoggerFunctionMap: { [key: string]: string } = {
        [kafkaLogLevel.NOTHING] : 'log',
        [kafkaLogLevel.INFO]    : 'log',
        [kafkaLogLevel.DEBUG]   : 'log',
        [kafkaLogLevel.WARN]    : 'warn',
        [kafkaLogLevel.ERROR]   : 'error',
    };

    if (kafkaLogLevelToLoggerFunctionMap[logLevel] !== undefined) {
        // @ts-ignore
        console.log("kafka logging ", kafkaLogLevelToLoggerFunctionMap[logLevel], args.log.message);
    }
}

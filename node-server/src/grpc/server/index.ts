const grpc = require('@grpc/grpc-js');
const msgExchanger = require('../proto/msgExchanger_grpc_pb');
const msgExchangerImpl = require('./msgExchangerImpl');

const server = new grpc.Server();

const creds = grpc.ServerCredentials.createInsecure();

function cleanupGrpc() {
    if(server) {
        server.forceShutdown();
    }
}

export default function startGrpc(port: string) {
    server.addService(msgExchanger.msgExchangerService, msgExchangerImpl);
    server.bindAsync(port, creds, (error, _) => {
        if(error) {
            return cleanupGrpc();
        }

        server.start();
    });
}

export { startGrpc, cleanupGrpc };

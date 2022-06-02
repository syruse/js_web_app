import { Server, ServerCredentials } from '@grpc/grpc-js';
import { msgExchangerService } from '../proto/msgExchanger_grpc_pb';
import msgExchangerImpl from './msgExchangerImpl';

const server = new Server({
    'grpc.max_receive_message_length': -1,
    'grpc.max_send_message_length': -1,
});

const creds = ServerCredentials.createInsecure();

function cleanupGrpc() {
    if(server) {
        server.forceShutdown();
    }
}

export default function startGrpc(port: string) {
    server.addService(msgExchangerService, new msgExchangerImpl());
    server.bindAsync(port, creds, (error: Error | null, bindPort: number) => {
        if(error) {
            cleanupGrpc();
            throw error;
        }

        server.start();
    });
}

export { startGrpc, cleanupGrpc };

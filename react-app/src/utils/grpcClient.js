import { MsgRequest} from "../grpc/msgExchanger_pb.js";
import {msgExchangerClient} from '../grpc/msgExchanger_grpc_web_pb.js';

const msgExchanger = new msgExchangerClient('http://localhost:5002');

let stream = undefined;

const typeMsg = (msg, token, callback) => {
    const request = new MsgRequest();
    request.setMsg(msg);
    const metadata = {};// TODO {'token': token};
    msgExchanger.ping(request, metadata, (err, res) => {
        if (err) {
            callback(false, err.message);
        } else {
            callback(true, res.getMsg());
            stream = msgExchanger.sendMsg_grpc_web(new MsgRequest(), metadata);
            mountToChat(callback);
        }
    });
};

const mountToChat = (callback) => {
    if (!stream) {
        callback(false, 'stream not initialized');
        return;
    }

    stream.on('data', function (res) {
        callback(true, res.getMsg());
    });
    stream.on('error', function (res) {
        callback(false, res.message);
    });
    stream.on('end', function (end) {
        callback(false, 'stream interrupted');
    });
};

const closeChat = () => stream.cancel();

export {typeMsg, closeChat};

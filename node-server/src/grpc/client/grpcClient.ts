import * as grpc from "@grpc/grpc-js";
import { MsgRequest, MsgResponse } from '../proto/msgExchanger_pb';
import { msgExchangerClient } from '../proto/msgExchanger_grpc_pb';

const creds = grpc.ChannelCredentials.createInsecure();

const client = new msgExchangerClient(
    'localhost:5001',
    creds,
);

const call = client.sendMsg();

console.log('grpc client started');

process.on('exit', (code) => {
    console.log('grpc client closing');
    // close msg exhange stream with consultant
    call.end();
    client.close();
});

export default function typeMsgToConsultant(msg: string) {
    console.log('typeMsgToConsultant ', msg);

    call
    .on('data', (res: MsgResponse) => {
      console.log(`Consultant responded: ${res.getMsg()}`);
    })
    .on('end', () => console.log('typeMsgToConsultant: End'))
    .on('error', (err: Error) => console.error('typeMsgToConsultant:', err));

    const req: MsgRequest = new MsgRequest();
    req.setMsg(msg);
    call.write(req);
}

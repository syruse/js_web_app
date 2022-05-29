import { ServerUnaryCall, ServerDuplexStream, ServerWritableStream, sendUnaryData, UntypedHandleCall } from "@grpc/grpc-js";
import { ImsgExchangerServer } from "../proto/msgExchanger_grpc_pb";
import { MsgRequest, MsgResponse } from "../proto/msgExchanger_pb"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default class msgExchangerImpl implements ImsgExchangerServer {
  
  // Argument of type 'typeof msgExchangerImpl' is not assignable to parameter of type 'UntypedServiceImplementation'.
  // Index signature for type 'string' is missing in type 'typeof msgExchangerImpl'.ts(2345)
  [method: string]: UntypedHandleCall;

  ping(call: ServerUnaryCall<MsgRequest, MsgResponse>, callback: sendUnaryData<MsgResponse>): void {
    console.log('ping was invoked');
    const msg: string = call.request.getMsg();
    console.log(`Received request: ${msg}`);
    const res = new MsgResponse().setMsg(`Hello, I am bot \n please type your request`);

    callback(null, res);
  }

  async sendMsg_grpc_web(call: ServerWritableStream<MsgRequest, MsgResponse>): Promise<void> {
    console.log('sendMsg_grpc_web was invoked');
    const msg: string = call.request.getMsg();
    console.log(`Received request: ${msg}`);
    const res = new MsgResponse()
          .setMsg(`agry with your request ${msg}, anything else?`);

    // some delay before replying
    await sleep(3000);
    call.write(res);

    // TODO: hoist chat interrupting to some function
    // call.end();
  }

  sendMsg(call: ServerDuplexStream<MsgRequest, MsgResponse>): void {
    console.log('sendMsg was invoked');
    call.on('data', (req: MsgRequest) => {
      console.log(`Received request: ${req.getMsg()}`);
      const res = new MsgResponse()
          .setMsg(`Hello ${req.getMsg()}`);
  
      console.log(`Sending response: ${res}`);
      call.write(res);
    }).on('end', () => 
          call.end()).on('error', (err: Error) => {
                          console.error('sendMsg:', err.message);
    });
  }
}



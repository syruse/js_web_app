import { ServerDuplexStream, UntypedHandleCall } from "@grpc/grpc-js";
import { ImsgExchangerServer, msgExchangerService } from "../proto/msgExchanger_grpc_pb";
import { MsgRequest, MsgResponse } from "../proto/msgExchanger_pb"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export default class msgExchangerImpl implements ImsgExchangerServer {
  
  // Argument of type 'typeof msgExchangerImpl' is not assignable to parameter of type 'UntypedServiceImplementation'.
  // Index signature for type 'string' is missing in type 'typeof msgExchangerImpl'.ts(2345)
  [method: string]: UntypedHandleCall;

  sendMsg(call: ServerDuplexStream<MsgRequest, MsgResponse>): void{
    console.log('SendMsg was invoked');
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



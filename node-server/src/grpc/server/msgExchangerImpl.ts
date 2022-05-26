const pb = require('../proto/msgExchanger_grpc_pb');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

exports.SendMsg = (call, _) => {
    console.log('SendMsg was invoked');
    call.on('data', (req) => {
      console.log(`Received request: ${req}`);
      const res = new pb.MsgResponse()
          .setMsg(`Hello ${req.getMsg()}`);
  
      console.log(`Sending response: ${res}`);
      call.write(res);
    });
  
    call.on('end', () => call.end());
};

// package: msgExchanger
// file: src/grpc/proto/msgExchanger.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as src_grpc_proto_msgExchanger_pb from "./msgExchanger_pb";

interface ImsgExchangerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMsg: ImsgExchangerService_ISendMsg;
}

interface ImsgExchangerService_ISendMsg extends grpc.MethodDefinition<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse> {
    path: "/msgExchanger.msgExchanger/SendMsg";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    requestDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    responseSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
    responseDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export const msgExchangerService: ImsgExchangerService;

export interface ImsgExchangerServer {
    sendMsg: grpc.handleBidiStreamingCall<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export interface ImsgExchangerClient {
    sendMsg(): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export class msgExchangerClient extends grpc.Client implements ImsgExchangerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sendMsg(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    public sendMsg(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

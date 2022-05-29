// package: msgExchanger
// file: src/grpc/proto/msgExchanger.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as src_grpc_proto_msgExchanger_pb from "./msgExchanger_pb";

interface ImsgExchangerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    ping: ImsgExchangerService_IPing;
    sendMsg: ImsgExchangerService_ISendMsg;
    sendMsg_grpc_web: ImsgExchangerService_ISendMsg_grpc_web;
}

interface ImsgExchangerService_IPing extends grpc.MethodDefinition<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse> {
    path: "/msgExchanger.msgExchanger/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    requestDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    responseSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
    responseDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
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
interface ImsgExchangerService_ISendMsg_grpc_web extends grpc.MethodDefinition<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse> {
    path: "/msgExchanger.msgExchanger/SendMsg_grpc_web";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    requestDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgRequest>;
    responseSerialize: grpc.serialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
    responseDeserialize: grpc.deserialize<src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export const msgExchangerService: ImsgExchangerService;

export interface ImsgExchangerServer {
    ping: grpc.handleUnaryCall<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg: grpc.handleBidiStreamingCall<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg_grpc_web: grpc.handleServerStreamingCall<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export interface ImsgExchangerClient {
    ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    sendMsg(): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg_grpc_web(request: src_grpc_proto_msgExchanger_pb.MsgRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<src_grpc_proto_msgExchanger_pb.MsgResponse>;
    sendMsg_grpc_web(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

export class msgExchangerClient extends grpc.Client implements ImsgExchangerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    public ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    public ping(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_grpc_proto_msgExchanger_pb.MsgResponse) => void): grpc.ClientUnaryCall;
    public sendMsg(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    public sendMsg(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_grpc_proto_msgExchanger_pb.MsgRequest, src_grpc_proto_msgExchanger_pb.MsgResponse>;
    public sendMsg_grpc_web(request: src_grpc_proto_msgExchanger_pb.MsgRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<src_grpc_proto_msgExchanger_pb.MsgResponse>;
    public sendMsg_grpc_web(request: src_grpc_proto_msgExchanger_pb.MsgRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<src_grpc_proto_msgExchanger_pb.MsgResponse>;
}

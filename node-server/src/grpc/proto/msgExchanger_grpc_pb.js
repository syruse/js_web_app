// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var src_grpc_proto_msgExchanger_pb = require('./msgExchanger_pb.js');

function serialize_msgExchanger_MsgRequest(arg) {
  if (!(arg instanceof src_grpc_proto_msgExchanger_pb.MsgRequest)) {
    throw new Error('Expected argument of type msgExchanger.MsgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgExchanger_MsgRequest(buffer_arg) {
  return src_grpc_proto_msgExchanger_pb.MsgRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgExchanger_MsgResponse(arg) {
  if (!(arg instanceof src_grpc_proto_msgExchanger_pb.MsgResponse)) {
    throw new Error('Expected argument of type msgExchanger.MsgResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgExchanger_MsgResponse(buffer_arg) {
  return src_grpc_proto_msgExchanger_pb.MsgResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var msgExchangerService = exports.msgExchangerService = {
  ping: {
    path: '/msgExchanger.msgExchanger/Ping',
    requestStream: false,
    responseStream: false,
    requestType: src_grpc_proto_msgExchanger_pb.MsgRequest,
    responseType: src_grpc_proto_msgExchanger_pb.MsgResponse,
    requestSerialize: serialize_msgExchanger_MsgRequest,
    requestDeserialize: deserialize_msgExchanger_MsgRequest,
    responseSerialize: serialize_msgExchanger_MsgResponse,
    responseDeserialize: deserialize_msgExchanger_MsgResponse,
  },
  sendMsg: {
    path: '/msgExchanger.msgExchanger/SendMsg',
    requestStream: true,
    responseStream: true,
    requestType: src_grpc_proto_msgExchanger_pb.MsgRequest,
    responseType: src_grpc_proto_msgExchanger_pb.MsgResponse,
    requestSerialize: serialize_msgExchanger_MsgRequest,
    requestDeserialize: deserialize_msgExchanger_MsgRequest,
    responseSerialize: serialize_msgExchanger_MsgResponse,
    responseDeserialize: deserialize_msgExchanger_MsgResponse,
  },
  sendMsg_grpc_web: {
    path: '/msgExchanger.msgExchanger/SendMsg_grpc_web',
    requestStream: false,
    responseStream: true,
    requestType: src_grpc_proto_msgExchanger_pb.MsgRequest,
    responseType: src_grpc_proto_msgExchanger_pb.MsgResponse,
    requestSerialize: serialize_msgExchanger_MsgRequest,
    requestDeserialize: deserialize_msgExchanger_MsgRequest,
    responseSerialize: serialize_msgExchanger_MsgResponse,
    responseDeserialize: deserialize_msgExchanger_MsgResponse,
  },
};

exports.msgExchangerClient = grpc.makeGenericClientConstructor(msgExchangerService);

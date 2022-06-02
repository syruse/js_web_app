/**
 * @fileoverview gRPC-Web generated client stub for msgExchanger
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.msgExchanger = require('./msgExchanger_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.msgExchanger.msgExchangerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.msgExchanger.msgExchangerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.msgExchanger.MsgRequest,
 *   !proto.msgExchanger.MsgResponse>}
 */
const methodDescriptor_msgExchanger_Ping = new grpc.web.MethodDescriptor(
  '/msgExchanger.msgExchanger/Ping',
  grpc.web.MethodType.UNARY,
  proto.msgExchanger.MsgRequest,
  proto.msgExchanger.MsgResponse,
  /**
   * @param {!proto.msgExchanger.MsgRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.msgExchanger.MsgResponse.deserializeBinary
);


/**
 * @param {!proto.msgExchanger.MsgRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.msgExchanger.MsgResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.msgExchanger.MsgResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.msgExchanger.msgExchangerClient.prototype.ping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/msgExchanger.msgExchanger/Ping',
      request,
      metadata || {},
      methodDescriptor_msgExchanger_Ping,
      callback);
};


/**
 * @param {!proto.msgExchanger.MsgRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.msgExchanger.MsgResponse>}
 *     Promise that resolves to the response
 */
proto.msgExchanger.msgExchangerPromiseClient.prototype.ping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/msgExchanger.msgExchanger/Ping',
      request,
      metadata || {},
      methodDescriptor_msgExchanger_Ping);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.msgExchanger.MsgRequest,
 *   !proto.msgExchanger.MsgResponse>}
 */
const methodDescriptor_msgExchanger_SendMsg_grpc_web = new grpc.web.MethodDescriptor(
  '/msgExchanger.msgExchanger/SendMsg_grpc_web',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.msgExchanger.MsgRequest,
  proto.msgExchanger.MsgResponse,
  /**
   * @param {!proto.msgExchanger.MsgRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.msgExchanger.MsgResponse.deserializeBinary
);


/**
 * @param {!proto.msgExchanger.MsgRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.msgExchanger.MsgResponse>}
 *     The XHR Node Readable Stream
 */
proto.msgExchanger.msgExchangerClient.prototype.sendMsg_grpc_web =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/msgExchanger.msgExchanger/SendMsg_grpc_web',
      request,
      metadata || {},
      methodDescriptor_msgExchanger_SendMsg_grpc_web);
};


/**
 * @param {!proto.msgExchanger.MsgRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.msgExchanger.MsgResponse>}
 *     The XHR Node Readable Stream
 */
proto.msgExchanger.msgExchangerPromiseClient.prototype.sendMsg_grpc_web =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/msgExchanger.msgExchanger/SendMsg_grpc_web',
      request,
      metadata || {},
      methodDescriptor_msgExchanger_SendMsg_grpc_web);
};


module.exports = proto.msgExchanger;


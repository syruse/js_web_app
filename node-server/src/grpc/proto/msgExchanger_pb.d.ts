// package: msgExchanger
// file: src/grpc/proto/msgExchanger.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class MsgRequest extends jspb.Message { 
    getMsg(): string;
    setMsg(value: string): MsgRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MsgRequest): MsgRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgRequest;
    static deserializeBinaryFromReader(message: MsgRequest, reader: jspb.BinaryReader): MsgRequest;
}

export namespace MsgRequest {
    export type AsObject = {
        msg: string,
    }
}

export class MsgResponse extends jspb.Message { 
    getMsg(): string;
    setMsg(value: string): MsgResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgResponse): MsgResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgResponse;
    static deserializeBinaryFromReader(message: MsgResponse, reader: jspb.BinaryReader): MsgResponse;
}

export namespace MsgResponse {
    export type AsObject = {
        msg: string,
    }
}

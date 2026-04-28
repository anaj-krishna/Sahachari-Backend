import { Model, Types } from "mongoose";
import { UpiCollection, UpiCollectionDocument } from "./upi-collection.schema";
import { CreateUpiCollectionDto } from "./dto/create-upi-collection.dto";
export declare class UpiCollectionService {
    private readonly upiModel;
    constructor(upiModel: Model<UpiCollectionDocument>);
    create(dto: CreateUpiCollectionDto, superAdminId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAll(superAdminId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
}

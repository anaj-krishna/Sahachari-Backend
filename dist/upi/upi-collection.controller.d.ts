import { UpiCollectionService } from "./upi-collection.service";
import { CreateUpiCollectionDto } from "./dto/create-upi-collection.dto";
export declare class UpiCollectionController {
    private readonly upiService;
    constructor(upiService: UpiCollectionService);
    create(dto: CreateUpiCollectionDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./upi-collection.schema").UpiCollection, {}, import("mongoose").DefaultSchemaOptions> & import("./upi-collection.schema").UpiCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}

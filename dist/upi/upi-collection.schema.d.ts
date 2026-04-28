import { HydratedDocument, Types } from "mongoose";
export type UpiCollectionDocument = HydratedDocument<UpiCollection>;
export declare class UpiCollection {
    name: string;
    upiId: string;
    phoneNumber: string;
    superAdminId: Types.ObjectId;
}
export declare const UpiCollectionSchema: import("mongoose").Schema<UpiCollection, import("mongoose").Model<UpiCollection, any, any, any, (import("mongoose").Document<unknown, any, UpiCollection, any, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, UpiCollection, any, import("mongoose").DefaultSchemaOptions> & UpiCollection & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, UpiCollection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UpiCollection, import("mongoose").Document<unknown, {}, UpiCollection, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UpiCollection & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, UpiCollection, import("mongoose").Document<unknown, {}, UpiCollection, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    upiId?: import("mongoose").SchemaDefinitionProperty<string, UpiCollection, import("mongoose").Document<unknown, {}, UpiCollection, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, UpiCollection, import("mongoose").Document<unknown, {}, UpiCollection, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    superAdminId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, UpiCollection, import("mongoose").Document<unknown, {}, UpiCollection, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UpiCollection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, UpiCollection>;

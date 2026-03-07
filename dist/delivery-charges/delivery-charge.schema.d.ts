import { Document, Types } from 'mongoose';
export type DeliveryChargeDocument = DeliveryCharge & Document;
export declare class DeliveryCharge {
    pincode: string;
    charge: number;
    createdBy?: Types.ObjectId;
}
export declare const DeliveryChargeSchema: import("mongoose").Schema<DeliveryCharge, import("mongoose").Model<DeliveryCharge, any, any, any, (Document<unknown, any, DeliveryCharge, any, import("mongoose").DefaultSchemaOptions> & DeliveryCharge & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, DeliveryCharge, any, import("mongoose").DefaultSchemaOptions> & DeliveryCharge & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, DeliveryCharge>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeliveryCharge, Document<unknown, {}, DeliveryCharge, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DeliveryCharge & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    pincode?: import("mongoose").SchemaDefinitionProperty<string, DeliveryCharge, Document<unknown, {}, DeliveryCharge, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DeliveryCharge & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    charge?: import("mongoose").SchemaDefinitionProperty<number, DeliveryCharge, Document<unknown, {}, DeliveryCharge, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DeliveryCharge & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, DeliveryCharge, Document<unknown, {}, DeliveryCharge, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DeliveryCharge & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, DeliveryCharge>;

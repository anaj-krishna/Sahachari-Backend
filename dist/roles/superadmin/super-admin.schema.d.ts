import { Document, Types } from 'mongoose';
export declare class SuperAdmin extends Document {
    name: string;
    email: string;
    password: string;
    location: string;
    mobileNumber?: string;
    state?: string;
    district?: string;
    taluk?: string;
    localBodyType?: string;
    localBodyName?: string;
    ward?: string;
    addressLine1?: string;
    pincode?: string;
    role: string;
    storekeepers: Types.ObjectId[];
    deliveryBoys: Types.ObjectId[];
}
export declare const SuperAdminSchema: import("mongoose").Schema<SuperAdmin, import("mongoose").Model<SuperAdmin, any, any, any, (Document<unknown, any, SuperAdmin, any, import("mongoose").DefaultSchemaOptions> & SuperAdmin & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, SuperAdmin, any, import("mongoose").DefaultSchemaOptions> & SuperAdmin & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, SuperAdmin>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SuperAdmin, Document<unknown, {}, SuperAdmin, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mobileNumber?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    state?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    district?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    taluk?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    localBodyType?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    localBodyName?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ward?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    addressLine1?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pincode?: import("mongoose").SchemaDefinitionProperty<string | undefined, SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    storekeepers?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryBoys?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], SuperAdmin, Document<unknown, {}, SuperAdmin, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, SuperAdmin>;

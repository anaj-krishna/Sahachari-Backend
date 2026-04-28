import { HydratedDocument, Types } from "mongoose";
export type PaymentTransactionDocument = HydratedDocument<PaymentTransaction>;
export declare enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
export declare class PaymentTransaction {
    paymentRs: number;
    upiId: string;
    superAdminId: Types.ObjectId;
    checkoutId: string;
    status: PaymentStatus;
    transactionTimestamp: Date;
}
export declare const PaymentTransactionSchema: import("mongoose").Schema<PaymentTransaction, import("mongoose").Model<PaymentTransaction, any, any, any, (import("mongoose").Document<unknown, any, PaymentTransaction, any, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, PaymentTransaction, any, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, PaymentTransaction>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    paymentRs?: import("mongoose").SchemaDefinitionProperty<number, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    upiId?: import("mongoose").SchemaDefinitionProperty<string, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    superAdminId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    checkoutId?: import("mongoose").SchemaDefinitionProperty<string, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<PaymentStatus, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    transactionTimestamp?: import("mongoose").SchemaDefinitionProperty<Date, PaymentTransaction, import("mongoose").Document<unknown, {}, PaymentTransaction, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, PaymentTransaction>;

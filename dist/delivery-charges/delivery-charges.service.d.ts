import { Model, Types } from 'mongoose';
import { DeliveryCharge, DeliveryChargeDocument } from './delivery-charge.schema';
export declare class DeliveryChargesService {
    private readonly deliveryChargeModel;
    constructor(deliveryChargeModel: Model<DeliveryChargeDocument>);
    private assertValidPincode;
    private isSixDigitPincode;
    listAll(): Promise<(DeliveryCharge & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    listAllForSuperAdmin(superAdminId: string): Promise<(DeliveryCharge & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    upsert(pincode: string, charge: number): Promise<DeliveryCharge & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    upsertForSuperAdmin(superAdminId: string, pincode: string, charge: number): Promise<DeliveryCharge & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(pincode: string): Promise<{
        deletedCount: number;
    }>;
    removeForSuperAdmin(superAdminId: string, pincode: string): Promise<{
        deletedCount: number;
    }>;
    getChargeForPincode(pincode: string): Promise<number>;
}

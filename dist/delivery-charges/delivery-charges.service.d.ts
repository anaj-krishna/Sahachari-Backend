import { Model } from 'mongoose';
import { DeliveryCharge, DeliveryChargeDocument } from './delivery-charge.schema';
export declare class DeliveryChargesService {
    private readonly deliveryChargeModel;
    constructor(deliveryChargeModel: Model<DeliveryChargeDocument>);
    private assertValidPincode;
    private isSixDigitPincode;
    listAll(): Promise<(DeliveryCharge & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    upsert(pincode: string, charge: number): Promise<DeliveryCharge & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(pincode: string): Promise<{
        deletedCount: number;
    }>;
    getChargeForPincode(pincode: string): Promise<number>;
}

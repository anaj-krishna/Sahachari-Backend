import { Model, Types } from "mongoose";
import { PaymentTransaction, PaymentTransactionDocument } from "./payment-transaction.schema";
import { CreatePaymentTransactionDto } from "./dto/create-payment-transaction.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";
export declare class PaymentTransactionService {
    private readonly paymentModel;
    constructor(paymentModel: Model<PaymentTransactionDocument>);
    create(dto: CreatePaymentTransactionDto, superAdminId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findByCheckoutId(checkoutId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateStatus(checkoutId: string, dto: UpdatePaymentStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & PaymentTransaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
}

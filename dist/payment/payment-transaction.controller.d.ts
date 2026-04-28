import { PaymentTransactionService } from "./payment-transaction.service";
import { CreatePaymentTransactionDto } from "./dto/create-payment-transaction.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";
export declare class PaymentTransactionController {
    private readonly paymentService;
    constructor(paymentService: PaymentTransactionService);
    create(dto: CreatePaymentTransactionDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findByCheckoutId(checkoutId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateStatus(checkoutId: string, dto: UpdatePaymentStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./payment-transaction.schema").PaymentTransaction, {}, import("mongoose").DefaultSchemaOptions> & import("./payment-transaction.schema").PaymentTransaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}

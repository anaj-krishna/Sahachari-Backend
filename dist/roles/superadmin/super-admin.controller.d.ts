import { SuperAdminService } from './super-admin.service';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Model, Types } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import { OrdersService } from '../../orders/orders.service';
import { ProductsService } from '../../products/products.service';
export declare class SuperAdminController {
    private readonly superAdminService;
    private readonly authService;
    private readonly ordersService;
    private readonly productsService;
    private readonly superAdminModel;
    constructor(superAdminService: SuperAdminService, authService: AuthService, ordersService: OrdersService, productsService: ProductsService, superAdminModel: Model<SuperAdmin>);
    private ensureValidObjectId;
    private ensureMember;
    signup(dto: SuperAdminSignupDto): Promise<{
        id: Types.ObjectId;
        email: string;
        role: string;
        message: string;
    }>;
    login(dto: SuperAdminLoginDto): Promise<{
        id: Types.ObjectId;
        email: string;
        role: string;
        token: string;
        message: string;
    }>;
    getProfile(req: any): Promise<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStorekeepers(req: any): Promise<Types.ObjectId[]>;
    getStorekeeperDetail(req: any, userId: string): Promise<any>;
    getDeliveryBoys(req: any): Promise<Types.ObjectId[]>;
    getDeliveryBoyDetail(req: any, userId: string): Promise<any>;
    saGetStoreProducts(req: any, storeId: string): Promise<{
        _id: Types.ObjectId;
        storeId: Types.ObjectId;
        name: string;
        description?: string;
        images?: string[];
        quantity: number;
        price: string;
        category?: string;
        offers: {
            type: import("../../products/product.schema").DiscountType;
            value: number;
            isActive: boolean;
            startDate?: Date;
            endDate?: Date;
        }[];
    }[]>;
    saCreateProduct(req: any, storeId: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saGetStoreProduct(req: any, storeId: string, productId: string): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saUpdateProduct(req: any, storeId: string, productId: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saDeleteProduct(req: any, storeId: string, productId: string): Promise<{
        message: string;
    }>;
    saAddOffer(req: any, storeId: string, productId: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saDeleteOffer(req: any, storeId: string, productId: string): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saUpdateStock(req: any, storeId: string, productId: string, dto: {
        quantity: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saGetStoreOrders(req: any, storeId: string, status?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    saGetStoreOrder(req: any, storeId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saAcceptOrder(req: any, storeId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saRejectOrder(req: any, storeId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saMarkOrderReady(req: any, storeId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saAvailableDelivery(req: any, storeId: string, orderId: string): Promise<{
        orderId: string;
        availableDeliveryBoys: never[];
        message: string;
    }>;
    saGetDeliveryOrders(req: any, deliveryBoyId: string, mine?: string, status?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    saDeliveryMyJobs(req: any, deliveryBoyId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    saGetDeliveryOrder(req: any, deliveryBoyId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saAcceptJob(req: any, deliveryBoyId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saPickupJob(req: any, deliveryBoyId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saDeliverJob(req: any, deliveryBoyId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saFailJob(req: any, deliveryBoyId: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createStorekeeper(dto: RegisterDto, req: any): Promise<{
        id: string;
        email: string;
        role: Role;
        status: import("../../common/enums/account-status.enum").AccountStatus;
        message: string;
    }>;
    createDeliveryBoy(dto: RegisterDto, req: any): Promise<{
        id: string;
        email: string;
        role: Role;
        status: import("../../common/enums/account-status.enum").AccountStatus;
        message: string;
    }>;
}

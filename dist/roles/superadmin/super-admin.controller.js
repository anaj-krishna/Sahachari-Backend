"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminController = void 0;
const common_1 = require("@nestjs/common");
const super_admin_service_1 = require("./super-admin.service");
const super_admin_signup_dto_1 = require("./dto/super-admin-signup.dto");
const super_admin_login_dto_1 = require("./dto/super-admin-login.dto");
const register_dto_1 = require("../../auth/dto/register.dto");
const role_enum_1 = require("../../common/enums/role.enum");
const auth_service_1 = require("../../auth/auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const super_admin_schema_1 = require("./super-admin.schema");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const orders_service_1 = require("../../orders/orders.service");
const products_service_1 = require("../../products/products.service");
const delivery_charges_service_1 = require("../../delivery-charges/delivery-charges.service");
const upsert_delivery_charge_dto_1 = require("../../delivery-charges/dto/upsert-delivery-charge.dto");
let SuperAdminController = class SuperAdminController {
    superAdminService;
    authService;
    ordersService;
    productsService;
    deliveryChargesService;
    superAdminModel;
    constructor(superAdminService, authService, ordersService, productsService, deliveryChargesService, superAdminModel) {
        this.superAdminService = superAdminService;
        this.authService = authService;
        this.ordersService = ordersService;
        this.productsService = productsService;
        this.deliveryChargesService = deliveryChargesService;
        this.superAdminModel = superAdminModel;
    }
    ensureValidObjectId(id, label) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`${label} is invalid`);
        }
    }
    async ensureMember(superAdminId, memberId, path) {
        this.ensureValidObjectId(superAdminId, 'SuperAdmin id');
        this.ensureValidObjectId(memberId, 'User id');
        const exists = await this.superAdminModel.exists({
            _id: new mongoose_2.Types.ObjectId(superAdminId),
            [path]: new mongoose_2.Types.ObjectId(memberId),
        });
        if (!exists) {
            throw new common_1.BadRequestException(`${path === 'storekeepers' ? 'Storekeeper' : 'Delivery boy'} not linked to this super admin`);
        }
    }
    signup(dto) {
        return this.superAdminService.signup(dto);
    }
    login(dto) {
        return this.superAdminService.login(dto);
    }
    async getProfile(req) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.superAdminService.getProfile(superAdminId);
    }
    listDeliveryCharges(req) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.deliveryChargesService.listAllForSuperAdmin(superAdminId);
    }
    upsertDeliveryCharge(req, pincode, dto) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.deliveryChargesService.upsertForSuperAdmin(superAdminId, pincode, dto.charge);
    }
    deleteDeliveryCharge(req, pincode) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.deliveryChargesService.removeForSuperAdmin(superAdminId, pincode);
    }
    async getStorekeepers(req) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.superAdminService.getStorekeepers(superAdminId);
    }
    async getStorekeeperDetail(req, userId) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.superAdminService.getStorekeeperDetail(superAdminId, userId);
    }
    async getDeliveryBoys(req) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.superAdminService.getDeliveryBoys(superAdminId);
    }
    async getDeliveryBoyDetail(req, userId) {
        const superAdminId = req.user?.userId ?? req.user;
        return this.superAdminService.getDeliveryBoyDetail(superAdminId, userId);
    }
    async saGetStoreProducts(req, storeId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.getProductsByStore(storeId);
    }
    async saCreateProduct(req, storeId, dto) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.create(storeId, dto);
    }
    async saGetStoreProduct(req, storeId, productId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.getStoreProductById(storeId, productId);
    }
    async saUpdateProduct(req, storeId, productId, dto) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.updateProduct(storeId, productId, dto);
    }
    async saDeleteProduct(req, storeId, productId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.deleteProduct(storeId, productId);
    }
    async saAddOffer(req, storeId, productId, dto) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.addOffer(productId, dto);
    }
    async saDeleteOffer(req, storeId, productId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.removeSingleOffer(productId);
    }
    async saUpdateStock(req, storeId, productId, dto) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.productsService.updateStock(storeId, productId, dto.quantity);
    }
    async saGetStoreOrders(req, storeId, status) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.ordersService.getOrdersByStore(storeId, status);
    }
    async saGetStoreOrder(req, storeId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.ordersService.getStoreOrderById(storeId, orderId);
    }
    async saMarkOrderReady(req, storeId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.ordersService.updateOrderStatus(orderId, 'READY', storeId, 'STOREKEEPER');
    }
    async saAvailableDelivery(req, storeId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, storeId, 'storekeepers');
        return this.ordersService.getAvailableDeliveryBoys(storeId, orderId);
    }
    async saGetDeliveryOrders(req, deliveryBoyId, mine, status) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        if (mine === 'true') {
            return this.ordersService.getMyJobs(deliveryBoyId);
        }
        if (status === 'READY') {
            return this.ordersService.getAvailableJobs();
        }
        return [];
    }
    async saDeliveryMyJobs(req, deliveryBoyId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.getMyJobs(deliveryBoyId);
    }
    async saGetDeliveryOrder(req, deliveryBoyId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.getDeliveryOrderById(deliveryBoyId, orderId);
    }
    async saAcceptJob(req, deliveryBoyId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.updateOrderStatus(orderId, 'ACCEPTED', deliveryBoyId, 'DELIVERY');
    }
    async saPickupJob(req, deliveryBoyId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.updateOrderStatus(orderId, 'PICKED_UP', deliveryBoyId, 'DELIVERY');
    }
    async saDeliverJob(req, deliveryBoyId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.updateOrderStatus(orderId, 'DELIVERED', deliveryBoyId, 'DELIVERY');
    }
    async saFailJob(req, deliveryBoyId, orderId) {
        const superAdminId = req.user?.userId ?? req.user;
        await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
        return this.ordersService.updateOrderStatus(orderId, 'FAILED', deliveryBoyId, 'DELIVERY');
    }
    async createStorekeeper(dto, req) {
        dto.role = role_enum_1.Role.ADMIN;
        const user = await this.authService.register(dto);
        const superAdminId = req.user?.userId ?? req.user;
        await this.superAdminModel.findByIdAndUpdate(superAdminId, {
            $addToSet: { storekeepers: new mongoose_2.Types.ObjectId(user.id) },
        });
        return user;
    }
    async createDeliveryBoy(dto, req) {
        dto.role = role_enum_1.Role.DELIVERY;
        const user = await this.authService.register(dto);
        const superAdminId = req.user?.userId ?? req.user;
        await this.superAdminModel.findByIdAndUpdate(superAdminId, {
            $addToSet: { deliveryBoys: new mongoose_2.Types.ObjectId(user.id) },
        });
        return user;
    }
};
exports.SuperAdminController = SuperAdminController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [super_admin_signup_dto_1.SuperAdminSignupDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [super_admin_login_dto_1.SuperAdminLoginDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-charges'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "listDeliveryCharges", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('delivery-charges/:pincode'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('pincode')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upsert_delivery_charge_dto_1.UpsertDeliveryChargeDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "upsertDeliveryCharge", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delivery-charges/:pincode'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('pincode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "deleteDeliveryCharge", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getStorekeepers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getStorekeeperDetail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-boys'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getDeliveryBoys", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-boys/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getDeliveryBoyDetail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:storeId/products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetStoreProducts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('storekeepers/:storeId/products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saCreateProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:storeId/products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetStoreProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('storekeepers/:storeId/products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saUpdateProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('storekeepers/:storeId/products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saDeleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('storekeepers/:storeId/products/:id/offer'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saAddOffer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('storekeepers/:storeId/products/:id/offer'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saDeleteOffer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('storekeepers/:storeId/products/:id/stock'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saUpdateStock", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:storeId/orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetStoreOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:storeId/orders/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetStoreOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('storekeepers/:storeId/orders/:id/ready'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saMarkOrderReady", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('storekeepers/:storeId/orders/:id/available-delivery'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saAvailableDelivery", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-boys/:deliveryBoyId/orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Query)('mine')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetDeliveryOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-boys/:deliveryBoyId/orders/me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saDeliveryMyJobs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('delivery-boys/:deliveryBoyId/orders/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saGetDeliveryOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delivery-boys/:deliveryBoyId/orders/:id/accept'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saAcceptJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delivery-boys/:deliveryBoyId/orders/:id/pickup'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saPickupJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delivery-boys/:deliveryBoyId/orders/:id/deliver'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saDeliverJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delivery-boys/:deliveryBoyId/orders/:id/fail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('deliveryBoyId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "saFailJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-storekeeper'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "createStorekeeper", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-delivery-boy'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "createDeliveryBoy", null);
exports.SuperAdminController = SuperAdminController = __decorate([
    (0, common_1.Controller)('super-admin/auth'),
    __param(5, (0, mongoose_1.InjectModel)(super_admin_schema_1.SuperAdmin.name)),
    __metadata("design:paramtypes", [super_admin_service_1.SuperAdminService,
        auth_service_1.AuthService,
        orders_service_1.OrdersService,
        products_service_1.ProductsService,
        delivery_charges_service_1.DeliveryChargesService,
        mongoose_2.Model])
], SuperAdminController);
//# sourceMappingURL=super-admin.controller.js.map
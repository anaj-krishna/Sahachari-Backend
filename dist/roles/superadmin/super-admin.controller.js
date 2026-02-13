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
let SuperAdminController = class SuperAdminController {
    superAdminService;
    authService;
    superAdminModel;
    constructor(superAdminService, authService, superAdminModel) {
        this.superAdminService = superAdminService;
        this.authService = authService;
        this.superAdminModel = superAdminModel;
    }
    signup(dto) {
        return this.superAdminService.signup(dto);
    }
    login(dto) {
        return this.superAdminService.login(dto);
    }
    async createStorekeeper(dto, req) {
        dto.role = role_enum_1.Role.ADMIN;
        const user = await this.authService.register(dto);
        const superAdminId = req.user;
        await this.superAdminModel.findByIdAndUpdate(superAdminId, { $addToSet: { storekeepers: new mongoose_2.Types.ObjectId(user.id) } });
        return user;
    }
    async createDeliveryBoy(dto, req) {
        dto.role = role_enum_1.Role.DELIVERY;
        const user = await this.authService.register(dto);
        const superAdminId = req.user;
        await this.superAdminModel.findByIdAndUpdate(superAdminId, { $addToSet: { deliveryBoys: new mongoose_2.Types.ObjectId(user.id) } });
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
    __param(2, (0, mongoose_1.InjectModel)(super_admin_schema_1.SuperAdmin.name)),
    __metadata("design:paramtypes", [super_admin_service_1.SuperAdminService,
        auth_service_1.AuthService,
        mongoose_2.Model])
], SuperAdminController);
//# sourceMappingURL=super-admin.controller.js.map
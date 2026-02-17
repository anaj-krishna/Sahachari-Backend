"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const super_admin_schema_1 = require("./super-admin.schema");
let SuperAdminService = class SuperAdminService {
    adminModel;
    jwtService;
    constructor(adminModel, jwtService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
    }
    USER_FIELDS = 'name email role address serviceablePincodes status mobileNumber address2 image isVerified';
    validateId(id, label) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException(`${label} is invalid`);
    }
    async signup(dto) {
        if (await this.adminModel.exists({ email: dto.email }))
            throw new common_1.BadRequestException('Email already exists');
        const location = dto.location ||
            [
                dto.addressLine1,
                dto.localBodyName,
                dto.taluk,
                dto.district,
                dto.state,
                dto.pincode,
            ]
                .filter(Boolean)
                .join(', ');
        if (!location)
            throw new common_1.BadRequestException('location should not be empty');
        const admin = await this.adminModel.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
            location,
            role: 'SUPER_ADMIN',
            storekeepers: [],
            deliveryBoys: [],
        });
        return {
            id: admin._id,
            email: admin.email,
            role: admin.role,
            message: 'Registered successfully',
        };
    }
    async login({ email, password }) {
        const admin = await this.adminModel.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password)))
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({
            sub: admin._id,
            role: admin.role,
            email: admin.email,
        });
        return {
            id: admin._id,
            email: admin.email,
            role: admin.role,
            token,
            message: 'Login successful',
        };
    }
    async getProfile(adminId) {
        this.validateId(adminId, 'SuperAdmin id');
        const admin = await this.adminModel
            .findById(adminId)
            .select('-password')
            .lean();
        if (!admin)
            throw new common_1.NotFoundException('Super Admin not found');
        return admin;
    }
    async getMembers(adminId, path) {
        this.validateId(adminId, 'SuperAdmin id');
        const doc = await this.adminModel
            .findById(adminId)
            .populate({ path, model: 'User', select: this.USER_FIELDS })
            .lean();
        return doc?.[path] ?? [];
    }
    async getMemberDetail(adminId, path, userId) {
        this.validateId(adminId, 'SuperAdmin id');
        this.validateId(userId, 'User id');
        const doc = await this.adminModel
            .findById(adminId)
            .populate({
            path,
            model: 'User',
            match: { _id: new mongoose_2.Types.ObjectId(userId) },
            select: this.USER_FIELDS,
        })
            .lean();
        const user = doc?.[path]?.[0];
        if (!user)
            throw new common_1.NotFoundException(`${path.slice(0, -1)} not found in registry`);
        return user;
    }
    getStorekeepers(id) {
        return this.getMembers(id, 'storekeepers');
    }
    getStorekeeperDetail(aid, uid) {
        return this.getMemberDetail(aid, 'storekeepers', uid);
    }
    getDeliveryBoys(id) {
        return this.getMembers(id, 'deliveryBoys');
    }
    getDeliveryBoyDetail(aid, uid) {
        return this.getMemberDetail(aid, 'deliveryBoys', uid);
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(super_admin_schema_1.SuperAdmin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map
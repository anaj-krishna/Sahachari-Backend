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
const super_admin_schema_1 = require("./super-admin.schema");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let SuperAdminService = class SuperAdminService {
    superAdminModel;
    jwtService;
    constructor(superAdminModel, jwtService) {
        this.superAdminModel = superAdminModel;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const existing = await this.superAdminModel.findOne({ email: dto.email });
        if (existing) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const derivedLocation = dto.location
            ? dto.location
            : [
                dto.addressLine1,
                dto.localBodyName,
                dto.taluk,
                dto.district,
                dto.state,
                dto.pincode,
            ]
                .filter(Boolean)
                .join(', ');
        if (!derivedLocation) {
            throw new common_1.BadRequestException('location should not be empty');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const admin = await this.superAdminModel.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            location: derivedLocation,
            mobileNumber: dto.mobileNumber,
            state: dto.state,
            district: dto.district,
            taluk: dto.taluk,
            localBodyType: dto.localBodyType,
            localBodyName: dto.localBodyName,
            ward: dto.ward,
            addressLine1: dto.addressLine1,
            pincode: dto.pincode,
            role: 'SUPER_ADMIN',
            storekeepers: [],
            deliveryBoys: [],
        });
        return {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
            location: admin.location,
            message: 'Super Admin registered successfully',
        };
    }
    async getProfile(superAdminId) {
        const admin = await this.superAdminModel
            .findById(superAdminId)
            .select('-password')
            .lean();
        if (!admin)
            throw new common_1.NotFoundException('Super Admin not found');
        return admin;
    }
    async getStorekeepers(superAdminId) {
        const doc = await this.superAdminModel
            .findById(superAdminId)
            .select('storekeepers')
            .populate({
            path: 'storekeepers',
            model: 'User',
            select: 'name email role address serviceablePincodes status mobileNumber',
        })
            .lean();
        return doc?.storekeepers ?? [];
    }
    async getDeliveryBoys(superAdminId) {
        const doc = await this.superAdminModel
            .findById(superAdminId)
            .select('deliveryBoys')
            .populate({
            path: 'deliveryBoys',
            model: 'User',
            select: 'name email role address serviceablePincodes status mobileNumber',
        })
            .lean();
        return doc?.deliveryBoys ?? [];
    }
    async login(dto) {
        const admin = await this.superAdminModel.findOne({ email: dto.email });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({
            sub: admin._id.toString(),
            role: admin.role,
            email: admin.email,
        });
        return {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
            location: admin.location,
            token,
            message: 'Login successful',
        };
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
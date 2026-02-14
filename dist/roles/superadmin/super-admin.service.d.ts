import { Model } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import { JwtService } from '@nestjs/jwt';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
export declare class SuperAdminService {
    private readonly superAdminModel;
    private readonly jwtService;
    constructor(superAdminModel: Model<SuperAdmin>, jwtService: JwtService);
    signup(dto: SuperAdminSignupDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        message: string;
    }>;
    getProfile(superAdminId: string): Promise<SuperAdmin & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStorekeepers(superAdminId: string): Promise<import("mongoose").Types.ObjectId[]>;
    getDeliveryBoys(superAdminId: string): Promise<import("mongoose").Types.ObjectId[]>;
    login(dto: SuperAdminLoginDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        token: string;
        message: string;
    }>;
}

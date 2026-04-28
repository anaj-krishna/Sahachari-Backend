import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './super-admin.schema';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
export declare class SuperAdminService {
    private readonly adminModel;
    private readonly jwtService;
    constructor(adminModel: Model<SuperAdmin>, jwtService: JwtService);
    private readonly USER_FIELDS;
    private validateId;
    signup(dto: SuperAdminSignupDto): Promise<{
        id: Types.ObjectId;
        email: string;
        role: string;
        message: string;
    }>;
    login({ email, password }: SuperAdminLoginDto): Promise<{
        id: Types.ObjectId;
        email: string;
        role: string;
        token: string;
        message: string;
    }>;
    getProfile(adminId: string): Promise<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    private getMembers;
    private getMemberDetail;
    getStorekeepers(id: string): Promise<Types.ObjectId[]>;
    getStorekeeperDetail(aid: string, uid: string): Promise<any>;
    getDeliveryBoys(id: string): Promise<Types.ObjectId[]>;
    getDeliveryBoyDetail(aid: string, uid: string): Promise<any>;
}

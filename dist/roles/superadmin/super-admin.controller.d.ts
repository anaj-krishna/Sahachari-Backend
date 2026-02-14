import { SuperAdminService } from './super-admin.service';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Model, Types } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
export declare class SuperAdminController {
    private readonly superAdminService;
    private readonly authService;
    private readonly superAdminModel;
    constructor(superAdminService: SuperAdminService, authService: AuthService, superAdminModel: Model<SuperAdmin>);
    signup(dto: SuperAdminSignupDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        message: string;
    }>;
    login(dto: SuperAdminLoginDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        token: string;
        message: string;
    }>;
    getProfile(req: any): Promise<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStorekeepers(req: any): Promise<Types.ObjectId[]>;
    getDeliveryBoys(req: any): Promise<Types.ObjectId[]>;
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

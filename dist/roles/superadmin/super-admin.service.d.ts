import { Model, Types } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import { JwtService } from '@nestjs/jwt';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
import { UsersService } from '../../users/users.service';
export declare class SuperAdminService {
    private readonly superAdminModel;
    private readonly jwtService;
    private readonly usersService;
    constructor(superAdminModel: Model<SuperAdmin>, jwtService: JwtService, usersService: UsersService);
    signup(dto: SuperAdminSignupDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        message: string;
    }>;
    getProfile(superAdminId: string): Promise<SuperAdmin & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStorekeepers(superAdminId: string): Promise<Types.ObjectId[]>;
    getDeliveryBoys(superAdminId: string): Promise<Types.ObjectId[]>;
    getStorekeeperDetail(superAdminId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../users/user.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../users/user.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getDeliveryBoyDetail(superAdminId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../users/user.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../users/user.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    login(dto: SuperAdminLoginDto): Promise<{
        id: string;
        email: string;
        role: string;
        location: string;
        token: string;
        message: string;
    }>;
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './super-admin.schema';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private readonly adminModel: Model<SuperAdmin>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly USER_FIELDS =
    'name email role address serviceablePincodes status mobileNumber address2 image isVerified';

  private validateId(id: string, label: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException(`${label} is invalid`);
  }

  // --- AUTHENTICATION ---

  async signup(dto: SuperAdminSignupDto) {
    if (await this.adminModel.exists({ email: dto.email }))
      throw new BadRequestException('Email already exists');

    const location =
      dto.location ||
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
      throw new BadRequestException('location should not be empty');

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

  async login({ email, password }: SuperAdminLoginDto) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password)))
      throw new UnauthorizedException('Invalid credentials');

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

  // --- PROFILE ---

  async getProfile(adminId: string) {
    this.validateId(adminId, 'SuperAdmin id');
    const admin = await this.adminModel
      .findById(adminId)
      .select('-password')
      .lean();
    if (!admin) throw new NotFoundException('Super Admin not found');
    return admin;
  }

  // --- REGISTRY MANAGEMENT (Storekeepers & Delivery Boys) ---

  private async getMembers(
    adminId: string,
    path: 'storekeepers' | 'deliveryBoys',
  ) {
    this.validateId(adminId, 'SuperAdmin id');
    const doc = await this.adminModel
      .findById(adminId)
      .populate({ path, model: 'User', select: this.USER_FIELDS })
      .lean();
    return doc?.[path] ?? [];
  }

  private async getMemberDetail(
    adminId: string,
    path: 'storekeepers' | 'deliveryBoys',
    userId: string,
  ) {
    this.validateId(adminId, 'SuperAdmin id');
    this.validateId(userId, 'User id');

    const doc = await this.adminModel
      .findById(adminId)
      .populate({
        path,
        model: 'User',
        match: { _id: new Types.ObjectId(userId) },
        select: this.USER_FIELDS,
      })
      .lean();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = (doc as any)?.[path]?.[0];
    if (!user)
      throw new NotFoundException(`${path.slice(0, -1)} not found in registry`);
    return user;
  }

  getStorekeepers(id: string) {
    return this.getMembers(id, 'storekeepers');
  }
  getStorekeeperDetail(aid: string, uid: string) {
    return this.getMemberDetail(aid, 'storekeepers', uid);
  }

  getDeliveryBoys(id: string) {
    return this.getMembers(id, 'deliveryBoys');
  }
  getDeliveryBoyDetail(aid: string, uid: string) {
    return this.getMemberDetail(aid, 'deliveryBoys', uid);
  }
}

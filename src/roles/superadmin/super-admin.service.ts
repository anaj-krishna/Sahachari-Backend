import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdmin>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // 📝 Signup → NO TOKEN
  async signup(dto: SuperAdminSignupDto) {
    const existing = await this.superAdminModel.findOne({ email: dto.email });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // derive a `location` string if frontend sent detailed address fields but not `location`
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
      throw new BadRequestException('location should not be empty');
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

  // � Get SuperAdmin profile
  async getProfile(superAdminId: string) {
    const admin = await this.superAdminModel
      .findById(superAdminId)
      .select('-password')
      .lean();
    if (!admin) throw new NotFoundException('Super Admin not found');
    return admin;
  }

  // 🧾 List storekeepers created by this SuperAdmin
  async getStorekeepers(superAdminId: string) {
    const doc = await this.superAdminModel
      .findById(superAdminId)
      .select('storekeepers')
      .populate({
        path: 'storekeepers',
        model: 'User',
        select:
          'name email role address serviceablePincodes status mobileNumber',
      })
      .lean();

    return doc?.storekeepers ?? [];
  }

  // 🚚 List delivery boys created by this SuperAdmin
  async getDeliveryBoys(superAdminId: string) {
    const doc = await this.superAdminModel
      .findById(superAdminId)
      .select('deliveryBoys')
      .populate({
        path: 'deliveryBoys',
        model: 'User',
        select:
          'name email role address serviceablePincodes status mobileNumber',
      })
      .lean();

    return doc?.deliveryBoys ?? [];
  }

  // 🧾 Get single storekeeper details created by this SuperAdmin
  async getStorekeeperDetail(superAdminId: string, userId: string) {
    const exists = await this.superAdminModel.exists({
      _id: new Types.ObjectId(superAdminId),
      storekeepers: new Types.ObjectId(userId),
    });

    if (!exists) {
      throw new NotFoundException('Storekeeper not found in your registry');
    }

    const user = await this.usersService.getById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 🚚 Get single delivery boy details created by this SuperAdmin
  async getDeliveryBoyDetail(superAdminId: string, userId: string) {
    const exists = await this.superAdminModel.exists({
      _id: new Types.ObjectId(superAdminId),
      deliveryBoys: new Types.ObjectId(userId),
    });

    if (!exists) {
      throw new NotFoundException('Delivery boy not found in your registry');
    }

    const user = await this.usersService.getById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // �🔐 Login → TOKEN
  async login(dto: SuperAdminLoginDto) {
    const admin = await this.superAdminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
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
}

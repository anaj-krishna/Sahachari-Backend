import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdmin>,
    private readonly jwtService: JwtService,
  ) {}

  // 📝 Signup → NO TOKEN
  async signup(dto: SuperAdminSignupDto) {
    const existing = await this.superAdminModel.findOne({ email: dto.email });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = await this.superAdminModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      location: dto.location,
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

  // 🔐 Login → TOKEN
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

  // async addStorekeeper(userId: string) {
  //   await this.superAdminModel.findByIdAndUpdate(userId, {
  //     $addToSet: { storekeepers: new Types.ObjectId(userId) },
  //   });
  // }

  // async addDeliveryBoy(userId: string) {
  //   const admin = await this.getMainSuperAdmin();
  //   await this.superAdminModel.findByIdAndUpdate(admin._id, {
  //     $addToSet: { deliveryBoys: new Types.ObjectId(userId) },
  //   });
  // }
}

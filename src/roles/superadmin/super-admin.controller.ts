/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminSignupDto } from './dto/super-admin-signup.dto';
import { SuperAdminLoginDto } from './dto/super-admin-login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SuperAdmin } from './super-admin.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('super-admin/auth')
export class SuperAdminController {
  constructor(
    private readonly superAdminService: SuperAdminService,
    private readonly authService: AuthService,
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdmin>,
  ) {}

  // 📝 Signup (no token)
  @Post('signup')
  signup(@Body() dto: SuperAdminSignupDto) {
    return this.superAdminService.signup(dto);
  }

  // 🔐 Login (returns token)
  @Post('login')
  login(@Body() dto: SuperAdminLoginDto) {
    return this.superAdminService.login(dto);
  }

  // 👤 Get SuperAdmin profile (SUPER ADMIN only)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getProfile(superAdminId);
  }

  // 🧾 Get Storekeepers created by this SuperAdmin
  @UseGuards(JwtAuthGuard)
  @Get('storekeepers')
  async getStorekeepers(@Req() req) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getStorekeepers(superAdminId);
  }

  // 🚚 Get DeliveryBoys created by this SuperAdmin
  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys')
  async getDeliveryBoys(@Req() req) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getDeliveryBoys(superAdminId);
  }

  // 🏬 Create Storekeeper (SUPER ADMIN only)
  @UseGuards(JwtAuthGuard)
  @Post('create-storekeeper')
  async createStorekeeper(@Body() dto: RegisterDto, @Req() req) {
    dto.role = Role.ADMIN; // or Role.STOREKEEPER

    // 1️⃣ Register user
    const user = await this.authService.register(dto);

    // 2️⃣ Get Super Admin id from JWT
    const superAdminId = req.user?.userId ?? req.user;

    // 3️⃣ Push ID into that SuperAdmin's storekeepers[]
    await this.superAdminModel.findByIdAndUpdate(superAdminId, {
      $addToSet: { storekeepers: new Types.ObjectId(user.id) },
    });

    return user;
  }

  // 🚚 Create Delivery Boy (SUPER ADMIN only)
  @UseGuards(JwtAuthGuard)
  @Post('create-delivery-boy')
  async createDeliveryBoy(@Body() dto: RegisterDto, @Req() req) {
    dto.role = Role.DELIVERY;

    const user = await this.authService.register(dto);

    const superAdminId = req.user?.userId ?? req.user;

    await this.superAdminModel.findByIdAndUpdate(superAdminId, {
      $addToSet: { deliveryBoys: new Types.ObjectId(user.id) },
    });

    return user;
  }
}

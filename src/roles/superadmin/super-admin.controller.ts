/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
  Query,
  Put,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
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
import { OrdersService } from '../../orders/orders.service';
import { ProductsService } from '../../products/products.service';

@Controller('super-admin/auth')
export class SuperAdminController {
  constructor(
    private readonly superAdminService: SuperAdminService,
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdmin>,
  ) {}

  private ensureValidObjectId(id: string, label: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${label} is invalid`);
    }
  }

  private async ensureMember(
    superAdminId: string,
    memberId: string,
    path: 'storekeepers' | 'deliveryBoys',
  ) {
    this.ensureValidObjectId(superAdminId, 'SuperAdmin id');
    this.ensureValidObjectId(memberId, 'User id');

    const exists = await this.superAdminModel.exists({
      _id: new Types.ObjectId(superAdminId),
      [path]: new Types.ObjectId(memberId),
    });
    if (!exists) {
      throw new BadRequestException(
        `${path === 'storekeepers' ? 'Storekeeper' : 'Delivery boy'} not linked to this super admin`,
      );
    }
  }

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

  // 🧾 Get Storekeeper details by id (created by this SuperAdmin)
  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:userId')
  async getStorekeeperDetail(@Req() req, @Param('userId') userId: string) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getStorekeeperDetail(superAdminId, userId);
  }

  // 🚚 Get DeliveryBoys created by this SuperAdmin
  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys')
  async getDeliveryBoys(@Req() req) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getDeliveryBoys(superAdminId);
  }

  // 🚚 Get Delivery boy details by id (created by this SuperAdmin)
  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys/:userId')
  async getDeliveryBoyDetail(@Req() req, @Param('userId') userId: string) {
    const superAdminId = req.user?.userId ?? req.user;
    return this.superAdminService.getDeliveryBoyDetail(superAdminId, userId);
  }

  /* ================= SUPER ADMIN — STOREKEEPER MANAGEMENT ================= */

  // Products
  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:storeId/products')
  async saGetStoreProducts(@Req() req, @Param('storeId') storeId: string) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.getProductsByStore(storeId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('storekeepers/:storeId/products')
  async saCreateProduct(
    @Req() req,
    @Param('storeId') storeId: string,
    @Body() dto: any,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.create(storeId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:storeId/products/:id')
  async saGetStoreProduct(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.getStoreProductById(storeId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('storekeepers/:storeId/products/:id')
  async saUpdateProduct(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
    @Body() dto: any,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.updateProduct(storeId, productId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('storekeepers/:storeId/products/:id')
  async saDeleteProduct(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.deleteProduct(storeId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('storekeepers/:storeId/products/:id/offer')
  async saAddOffer(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
    @Body() dto: any,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.addOffer(productId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('storekeepers/:storeId/products/:id/offer')
  async saDeleteOffer(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.removeSingleOffer(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('storekeepers/:storeId/products/:id/stock')
  async saUpdateStock(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') productId: string,
    @Body() dto: { quantity: number },
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.productsService.updateStock(storeId, productId, dto.quantity);
  }

  // Orders
  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:storeId/orders')
  async saGetStoreOrders(
    @Req() req,
    @Param('storeId') storeId: string,
    @Query('status') status?: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.ordersService.getOrdersByStore(storeId, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:storeId/orders/:id')
  async saGetStoreOrder(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.ordersService.getStoreOrderById(storeId, orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('storekeepers/:storeId/orders/:id/ready')
  async saMarkOrderReady(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.ordersService.updateOrderStatus(
      orderId,
      'READY',
      storeId,
      'STOREKEEPER',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('storekeepers/:storeId/orders/:id/available-delivery')
  async saAvailableDelivery(
    @Req() req,
    @Param('storeId') storeId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, storeId, 'storekeepers');
    return this.ordersService.getAvailableDeliveryBoys(storeId, orderId);
  }

  /* ================= SUPER ADMIN — DELIVERY BOY MANAGEMENT ================= */

  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys/:deliveryBoyId/orders')
  async saGetDeliveryOrders(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Query('mine') mine?: string,
    @Query('status') status?: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    if (mine === 'true') {
      return this.ordersService.getMyJobs(deliveryBoyId);
    }
    if (status === 'READY') {
      return this.ordersService.getAvailableJobs();
    }
    return [];
  }

  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys/:deliveryBoyId/orders/me')
  async saDeliveryMyJobs(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.getMyJobs(deliveryBoyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delivery-boys/:deliveryBoyId/orders/:id')
  async saGetDeliveryOrder(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.getDeliveryOrderById(deliveryBoyId, orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delivery-boys/:deliveryBoyId/orders/:id/accept')
  async saAcceptJob(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.updateOrderStatus(
      orderId,
      'ACCEPTED',
      deliveryBoyId,
      'DELIVERY',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('delivery-boys/:deliveryBoyId/orders/:id/pickup')
  async saPickupJob(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.updateOrderStatus(
      orderId,
      'PICKED_UP',
      deliveryBoyId,
      'DELIVERY',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('delivery-boys/:deliveryBoyId/orders/:id/deliver')
  async saDeliverJob(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.updateOrderStatus(
      orderId,
      'DELIVERED',
      deliveryBoyId,
      'DELIVERY',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('delivery-boys/:deliveryBoyId/orders/:id/fail')
  async saFailJob(
    @Req() req,
    @Param('deliveryBoyId') deliveryBoyId: string,
    @Param('id') orderId: string,
  ) {
    const superAdminId = req.user?.userId ?? req.user;
    await this.ensureMember(superAdminId, deliveryBoyId, 'deliveryBoys');
    return this.ordersService.updateOrderStatus(
      orderId,
      'FAILED',
      deliveryBoyId,
      'DELIVERY',
    );
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

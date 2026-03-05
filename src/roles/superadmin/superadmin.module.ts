import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { SuperAdmin, SuperAdminSchema } from './super-admin.schema';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from '../../orders/orders.module';
import { ProductsModule } from '../../products/products.module';
import { DeliveryChargesModule } from '../../delivery-charges/delivery-charges.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuperAdmin.name, schema: SuperAdminSchema },
    ]),
    UsersModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    DeliveryChargesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'superadmin_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}

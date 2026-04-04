import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryCharge, DeliveryChargeSchema } from './delivery-charge.schema';
import { DeliveryChargesService } from './delivery-charges.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryCharge.name, schema: DeliveryChargeSchema },
    ]),
  ],
  providers: [DeliveryChargesService],
  exports: [DeliveryChargesService],
})
export class DeliveryChargesModule {}

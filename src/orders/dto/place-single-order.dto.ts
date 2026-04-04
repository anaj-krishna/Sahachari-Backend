/* eslint-disable prettier/prettier */
import {
  IsMongoId,
  IsInt,
  Min,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PlaceOrderDto, PaymentMethod } from './place-order.dto';

export class PlaceSingleOrderDto {
  @ApiProperty({
    example: '65f2c1a8b3e2f123456789ab',
  })
  @IsMongoId()
  productId: string;

  @ApiProperty({
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    type: PlaceOrderDto,
  })
  @ValidateNested()
  @Type(() => PlaceOrderDto)
  deliveryAddress: PlaceOrderDto;

  // ✅ NEW: Payment Method at root level (optional alternative design)
  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.UPI,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
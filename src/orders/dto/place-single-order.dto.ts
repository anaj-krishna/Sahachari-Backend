/* eslint-disable prettier/prettier */
import { PlaceOrderDto } from './place-order.dto';
import { IsMongoId, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PlaceSingleOrderDto {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @ValidateNested()
  @Type(() => PlaceOrderDto)
  deliveryAddress: PlaceOrderDto;
}

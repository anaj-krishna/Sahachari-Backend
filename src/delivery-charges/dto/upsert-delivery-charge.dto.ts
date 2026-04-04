import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class UpsertDeliveryChargeDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  charge: number;
}

/* eslint-disable prettier/prettier */
import { IsString, IsOptional, MinLength } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  @MinLength(5)
  street: string;

  @IsString()
  @MinLength(2)
  city: string;

  @IsString()
  @MinLength(5)
  zipCode: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

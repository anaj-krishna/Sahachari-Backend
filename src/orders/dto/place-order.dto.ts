/* eslint-disable prettier/prettier */
import { IsString, IsOptional, MinLength, IsEnum } from 'class-validator';


export enum PaymentMethod {
  UPI = 'UPI',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  SELF_PICKUP = 'SELF_PICKUP',
}

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

  // ✅ NEW: Payment Method
 
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
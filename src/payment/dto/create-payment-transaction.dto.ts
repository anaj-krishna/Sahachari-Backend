// dto/create-payment-transaction.dto.ts
/* eslint-disable prettier/prettier */
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreatePaymentTransactionDto {
  @IsNumber()
  @Min(0)
  paymentRs: number;

  @IsString()
  @IsNotEmpty()
  upiId: string;


  @IsString()
  @IsNotEmpty()
  checkoutId: string;
}
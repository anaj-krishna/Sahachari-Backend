// dto/update-payment-status.dto.ts

import { IsEnum } from "class-validator";
import { PaymentStatus } from "../payment-transaction.schema";

export class UpdatePaymentStatusDto {
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
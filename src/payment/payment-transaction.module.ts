// payment-transaction.module.ts
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  PaymentTransaction,
  PaymentTransactionSchema,
} from "./payment-transaction.schema";

import { PaymentTransactionController } from "./payment-transaction.controller";
import { PaymentTransactionService } from "./payment-transaction.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PaymentTransaction.name,
        schema: PaymentTransactionSchema,
      },
    ]),
  ],
  controllers: [
    PaymentTransactionController,
  ],
  providers: [
    PaymentTransactionService,
  ],
  exports: [
    PaymentTransactionService,
  ],
})
export class PaymentTransactionModule {}
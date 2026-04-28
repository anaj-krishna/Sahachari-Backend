// payment-transaction.schema.ts
/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PaymentTransactionDocument =
  HydratedDocument<PaymentTransaction>;

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

@Schema({
  timestamps: true, // createdAt + updatedAt
})
export class PaymentTransaction {
  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  paymentRs: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  upiId: string;

  @Prop({
    type: Types.ObjectId,
    ref: "SuperAdmin",
    required: true,
  })
  superAdminId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  checkoutId: string;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Prop({
    type: Date,
    default: Date.now,
  })
  transactionTimestamp: Date;
}

export const PaymentTransactionSchema =
  SchemaFactory.createForClass(PaymentTransaction);
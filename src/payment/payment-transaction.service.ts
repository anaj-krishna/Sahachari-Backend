// payment-transaction.service.ts
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model,Types } from "mongoose";

import {
  PaymentTransaction,
  PaymentTransactionDocument,
  PaymentStatus,
} from "./payment-transaction.schema";

import { CreatePaymentTransactionDto } from "./dto/create-payment-transaction.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";

@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectModel(PaymentTransaction.name)
    private readonly paymentModel: Model<PaymentTransactionDocument>,
  ) {}

  async create(
    dto: CreatePaymentTransactionDto,
    superAdminId: string,
  ) {
    const created = await this.paymentModel.create({
      ...dto,    
superAdminId:new Types.ObjectId(superAdminId),
      status: PaymentStatus.PENDING,
    });

    return created;
  }

  async findAll() {
    return this.paymentModel
      .find()
      .sort({ createdAt: -1 })
      .populate("superAdminId");
  }

  async findByCheckoutId(
    checkoutId: string,
  ) {
    const payment = await this.paymentModel.findOne({
      checkoutId,
    });

    if (!payment) {
      throw new NotFoundException(
        "Payment transaction not found",
      );
    }

    return payment;
  }

  async updateStatus(
    checkoutId: string,
    dto: UpdatePaymentStatusDto,
  ) {
    const updated =
      await this.paymentModel.findOneAndUpdate(
        { checkoutId },
        {
          status: dto.status,
          transactionTimestamp: new Date(),
        },
        {
          new: true,
        },
      );

    if (!updated) {
      throw new NotFoundException(
        "Payment transaction not found",
      );
    }

    return updated;
  }

  async delete(
    id: string,
  ) {
    return this.paymentModel.findByIdAndDelete(id);
  }
}
// payment-transaction.controller.ts
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,UseGuards
} from "@nestjs/common";

import { PaymentTransactionService } from "./payment-transaction.service";
import { CreatePaymentTransactionDto } from "./dto/create-payment-transaction.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";
import { AuthGuard } from "@nestjs/passport";
@Controller("payment-transactions")
@UseGuards(AuthGuard("jwt"))
export class PaymentTransactionController {
  constructor(
    private readonly paymentService: PaymentTransactionService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreatePaymentTransactionDto,
    @Req() req,
  ) {
    const superAdminId = req.user.userId;
    return this.paymentService.create(dto,superAdminId);
  }

    @Get()
    findByDelivery(@Req() req) {
      const superAdminId = req.user.userId;
  
      return this.paymentService.findByDelivery(superAdminId);
    }

  // @Get()
  // findAll() {
  //   return this.paymentService.findAll();
  // }

  @Get(":checkoutId")
  findByCheckoutId(
    @Param("checkoutId")
    checkoutId: string,
  ) {
    return this.paymentService.findByCheckoutId(
      checkoutId,
    );
  }

  @Patch(":checkoutId/status")
  updateStatus(
    @Param("checkoutId")
    checkoutId: string,

    @Body()
    dto: UpdatePaymentStatusDto,
  ) {
    return this.paymentService.updateStatus(
      checkoutId,
      dto,
    );
  }

  @Delete(":id")
  delete(
    @Param("id")
    id: string,
  ) {
    return this.paymentService.delete(id);
  }
}
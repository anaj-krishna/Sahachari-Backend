/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { UpiCollectionService } from "./upi-collection.service";
import { CreateUpiCollectionDto } from "./dto/create-upi-collection.dto";

// Assume you already have JWT guard
import { AuthGuard } from "@nestjs/passport";

@Controller("upi-collection")
@UseGuards(AuthGuard("jwt"))
export class UpiCollectionController {
  constructor(
    private readonly upiService: UpiCollectionService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateUpiCollectionDto,
    @Req() req,
  ) {
    const superAdminId = req.user.userId; // 🔥 from JWT

    return this.upiService.create(
      dto,
      superAdminId,
    );
  }

  @Get()
  findAll(@Req() req) {
    const superAdminId = req.user.userId;

    return this.upiService.findAll(
      superAdminId,
    );
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.upiService.delete(id);
  }
}

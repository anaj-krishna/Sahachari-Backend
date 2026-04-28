/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import {
  UpiCollection,
  UpiCollectionDocument,
} from "./upi-collection.schema";

import { CreateUpiCollectionDto } from "./dto/create-upi-collection.dto";

@Injectable()
export class UpiCollectionService {
  constructor(
    @InjectModel(UpiCollection.name)
    private readonly upiModel: Model<UpiCollectionDocument>,
  ) {}

  async create(
    dto: CreateUpiCollectionDto,
    superAdminId: string,
  ) {
    return this.upiModel.create({
      ...dto,
      superAdminId: new Types.ObjectId(superAdminId),
    });
  }

  async findAll(superAdminId: string) {
    return this.upiModel.find({
      superAdminId,
    });
  }

  async delete(id: string) {
    const deleted =
      await this.upiModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException(
        "UPI record not found",
      );
    }

    return deleted;
  }
}
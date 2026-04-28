/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  UpiCollection,
  UpiCollectionSchema,
} from "./upi-collection.schema";

import { UpiCollectionController } from "./upi-collection.controller";
import { UpiCollectionService } from "./upi-collection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UpiCollection.name,
        schema: UpiCollectionSchema,
      },
    ]),
  ],
  controllers: [UpiCollectionController],
  providers: [UpiCollectionService],
  exports: [UpiCollectionService],
})
export class UpiCollectionModule {}
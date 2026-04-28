/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UpiCollectionDocument =
  HydratedDocument<UpiCollection>;

@Schema({
  timestamps: true,
})
export class UpiCollection {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  upiId: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    type: Types.ObjectId,
    ref: "SuperAdmin",
    required: true,
  })
  superAdminId: Types.ObjectId;
}

export const UpiCollectionSchema =
  SchemaFactory.createForClass(UpiCollection);
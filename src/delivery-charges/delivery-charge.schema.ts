import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeliveryChargeDocument = DeliveryCharge & Document;

@Schema({ timestamps: true })
export class DeliveryCharge {
  @Prop({ required: true, trim: true })
  pincode: string;

  @Prop({ required: true, min: 0 })
  charge: number;

  @Prop({ type: Types.ObjectId, ref: 'SuperAdmin', required: false })
  createdBy?: Types.ObjectId;
}

export const DeliveryChargeSchema =
  SchemaFactory.createForClass(DeliveryCharge);

DeliveryChargeSchema.index({ pincode: 1 }, { unique: true });

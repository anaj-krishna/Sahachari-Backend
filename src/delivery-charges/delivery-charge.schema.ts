import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliveryChargeDocument = DeliveryCharge & Document;

@Schema({ timestamps: true })
export class DeliveryCharge {
  @Prop({ required: true, trim: true })
  pincode: string;

  @Prop({ required: true, min: 0 })
  charge: number;
}

export const DeliveryChargeSchema =
  SchemaFactory.createForClass(DeliveryCharge);

DeliveryChargeSchema.index({ pincode: 1 }, { unique: true });

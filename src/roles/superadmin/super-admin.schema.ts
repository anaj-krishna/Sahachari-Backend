import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SuperAdmin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: 'SUPER_ADMIN' })
  role: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Storekeeper' }],
    default: [],
  })
  storekeepers: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'DeliveryBoy' }],
    default: [],
  })
  deliveryBoys: Types.ObjectId[];
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);

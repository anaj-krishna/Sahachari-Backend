import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

/* -------------------- ENUMS -------------------- */

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  SELF_PICKUP = 'SELF_PICKUP',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

/* -------------------- ORDER ITEM -------------------- */

@Schema({ timestamps: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number; // snapshot price at order time
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

/* -------------------- DELIVERY ADDRESS -------------------- */

@Schema({ _id: false })
export class DeliveryAddress {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  notes?: string;
}

const DeliveryAddressSchema = SchemaFactory.createForClass(DeliveryAddress);

/* -------------------- ORDER -------------------- */

@Schema({ timestamps: true })
export class Order {
  /* ---------- BASIC INFO ---------- */

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: String, required: true })
  checkoutId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  deliveryBoyId?: Types.ObjectId;

  /* ---------- ITEMS ---------- */

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true, default: 0 })
  itemsSubtotal: number;

  @Prop({ required: true, min: 0, default: 0 })
  deliveryCharge: number;

  @Prop({ required: true })
  totalAmount: number;

  /* ---------- ADDRESSES ---------- */

  @Prop({ type: DeliveryAddressSchema, required: true })
  deliveryAddress: DeliveryAddress;

  @Prop({ type: Object })
  pickupAddress: any;

  /* ---------- ORDER STATUS ---------- */

  @Prop({
    type: String,
    default: 'PLACED',
    enum: [
      'PLACED',
      'ACCEPTED',
      'REJECTED',
      'READY',
      'PICKED_UP',
      'DELIVERED',
      'FAILED',
      'CANCELLED',
    ],
  })
  status:
    | 'PLACED'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'READY'
    | 'PICKED_UP'
    | 'DELIVERED'
    | 'FAILED'
    | 'CANCELLED';

  /* ---------- PAYMENT ---------- */

  @Prop({
    type: String,
    enum: PaymentMethod,
    required: true,
    default: PaymentMethod.CASH_ON_DELIVERY,
  })
  paymentMethod: PaymentMethod;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Prop()
  transactionId?: string;

  @Prop()
  paymentGateway?: string; // Razorpay, Stripe

  @Prop()
  paidAt?: Date;

  @Prop({ type: Object })
  paymentResponse?: any; // raw gateway response

  @Prop({ default: 0 })
  amountPaid?: number;

  @Prop({ default: false })
  isPaymentVerified?: boolean;

  /* ---------- OPTIONAL SCALING FIELDS ---------- */

  @Prop({ default: 'INR' })
  currency?: string;

  @Prop()
  receiptUrl?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
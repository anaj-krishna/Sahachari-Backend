import { PlaceOrderDto, PaymentMethod } from './place-order.dto';
export declare class PlaceSingleOrderDto {
    productId: string;
    quantity: number;
    deliveryAddress: PlaceOrderDto;
    paymentMethod: PaymentMethod;
}

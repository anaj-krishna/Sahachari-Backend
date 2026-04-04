export declare enum PaymentMethod {
    UPI = "UPI",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    SELF_PICKUP = "SELF_PICKUP"
}
export declare class PlaceOrderDto {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
    notes?: string;
    paymentMethod: PaymentMethod;
}

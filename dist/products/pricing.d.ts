import { DiscountType } from './product.schema';
export type PriceableOffer = {
    type: DiscountType;
    value: number;
    isActive: boolean;
    startDate?: Date | string;
    endDate?: Date | string;
};
export type PriceableProduct = {
    price: string | number;
    offers?: PriceableOffer[];
};
export declare function toNumberPrice(price: string | number): number;
export declare function calculateFinalPrice(product: PriceableProduct): number;

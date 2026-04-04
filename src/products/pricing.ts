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

export function toNumberPrice(price: string | number): number {
  return Number(String(price ?? '').replace(/[^0-9.]/g, '')) || 0;
}

export function calculateFinalPrice(product: PriceableProduct): number {
  const basePrice = toNumberPrice(product.price);

  const offers = product.offers ?? [];
  if (offers.length === 0) return basePrice;

  const now = new Date();

  const activeOffer = offers.find((offer) => {
    if (!offer?.isActive) return false;

    const startDate = offer.startDate ? new Date(offer.startDate) : undefined;
    const endDate = offer.endDate ? new Date(offer.endDate) : undefined;

    if (startDate && startDate > now) return false;
    if (endDate && endDate < now) return false;

    return true;
  });

  if (!activeOffer) return basePrice;

  if (activeOffer.type === DiscountType.PERCENTAGE) {
    return Math.max(basePrice - (basePrice * activeOffer.value) / 100, 0);
  }

  if (activeOffer.type === DiscountType.FLAT) {
    return Math.max(basePrice - activeOffer.value, 0);
  }

  return basePrice;
}

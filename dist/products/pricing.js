"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumberPrice = toNumberPrice;
exports.calculateFinalPrice = calculateFinalPrice;
const product_schema_1 = require("./product.schema");
function toNumberPrice(price) {
    return Number(String(price ?? '').replace(/[^0-9.]/g, '')) || 0;
}
function calculateFinalPrice(product) {
    const basePrice = toNumberPrice(product.price);
    const offers = product.offers ?? [];
    if (offers.length === 0)
        return basePrice;
    const now = new Date();
    const activeOffer = offers.find((offer) => {
        if (!offer?.isActive)
            return false;
        const startDate = offer.startDate ? new Date(offer.startDate) : undefined;
        const endDate = offer.endDate ? new Date(offer.endDate) : undefined;
        if (startDate && startDate > now)
            return false;
        if (endDate && endDate < now)
            return false;
        return true;
    });
    if (!activeOffer)
        return basePrice;
    if (activeOffer.type === product_schema_1.DiscountType.PERCENTAGE) {
        return Math.max(basePrice - (basePrice * activeOffer.value) / 100, 0);
    }
    if (activeOffer.type === product_schema_1.DiscountType.FLAT) {
        return Math.max(basePrice - activeOffer.value, 0);
    }
    return basePrice;
}
//# sourceMappingURL=pricing.js.map
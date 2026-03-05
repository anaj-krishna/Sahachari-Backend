"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryChargeSchema = exports.DeliveryCharge = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DeliveryCharge = class DeliveryCharge {
    pincode;
    charge;
};
exports.DeliveryCharge = DeliveryCharge;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DeliveryCharge.prototype, "pincode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], DeliveryCharge.prototype, "charge", void 0);
exports.DeliveryCharge = DeliveryCharge = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DeliveryCharge);
exports.DeliveryChargeSchema = mongoose_1.SchemaFactory.createForClass(DeliveryCharge);
exports.DeliveryChargeSchema.index({ pincode: 1 }, { unique: true });
//# sourceMappingURL=delivery-charge.schema.js.map
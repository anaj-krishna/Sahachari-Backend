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
exports.PlaceSingleOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const place_order_dto_1 = require("./place-order.dto");
class PlaceSingleOrderDto {
    productId;
    quantity;
    deliveryAddress;
    paymentMethod;
}
exports.PlaceSingleOrderDto = PlaceSingleOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '65f2c1a8b3e2f123456789ab',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], PlaceSingleOrderDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlaceSingleOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: place_order_dto_1.PlaceOrderDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => place_order_dto_1.PlaceOrderDto),
    __metadata("design:type", place_order_dto_1.PlaceOrderDto)
], PlaceSingleOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: place_order_dto_1.PaymentMethod,
        example: place_order_dto_1.PaymentMethod.UPI,
    }),
    (0, class_validator_1.IsEnum)(place_order_dto_1.PaymentMethod),
    __metadata("design:type", String)
], PlaceSingleOrderDto.prototype, "paymentMethod", void 0);
//# sourceMappingURL=place-single-order.dto.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryChargesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const delivery_charge_schema_1 = require("./delivery-charge.schema");
let DeliveryChargesService = class DeliveryChargesService {
    deliveryChargeModel;
    constructor(deliveryChargeModel) {
        this.deliveryChargeModel = deliveryChargeModel;
    }
    assertValidPincode(pincode) {
        if (!/^[0-9]{6}$/.test(pincode)) {
            throw new common_1.BadRequestException('Pincode must be a 6 digit string');
        }
    }
    isSixDigitPincode(pincode) {
        return /^[0-9]{6}$/.test(pincode);
    }
    async listAll() {
        return this.deliveryChargeModel.find().sort({ pincode: 1 }).lean();
    }
    async upsert(pincode, charge) {
        this.assertValidPincode(pincode);
        const updated = await this.deliveryChargeModel
            .findOneAndUpdate({ pincode }, { $set: { pincode, charge } }, { new: true, upsert: true })
            .lean();
        return updated;
    }
    async remove(pincode) {
        this.assertValidPincode(pincode);
        const res = await this.deliveryChargeModel.deleteOne({ pincode });
        return { deletedCount: res.deletedCount };
    }
    async getChargeForPincode(pincode) {
        if (!this.isSixDigitPincode(pincode)) {
            return 0;
        }
        const rule = await this.deliveryChargeModel.findOne({ pincode }).lean();
        return rule?.charge ?? 0;
    }
};
exports.DeliveryChargesService = DeliveryChargesService;
exports.DeliveryChargesService = DeliveryChargesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(delivery_charge_schema_1.DeliveryCharge.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeliveryChargesService);
//# sourceMappingURL=delivery-charges.service.js.map
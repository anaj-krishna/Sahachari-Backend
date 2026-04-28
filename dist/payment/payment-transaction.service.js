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
exports.PaymentTransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_transaction_schema_1 = require("./payment-transaction.schema");
let PaymentTransactionService = class PaymentTransactionService {
    paymentModel;
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async create(dto, superAdminId) {
        const created = await this.paymentModel.create({
            ...dto,
            superAdminId: new mongoose_2.Types.ObjectId(superAdminId),
            status: payment_transaction_schema_1.PaymentStatus.PENDING,
        });
        return created;
    }
    async findAll() {
        return this.paymentModel
            .find()
            .sort({ createdAt: -1 })
            .populate("superAdminId");
    }
    async findByCheckoutId(checkoutId) {
        const payment = await this.paymentModel.findOne({
            checkoutId,
        });
        if (!payment) {
            throw new common_1.NotFoundException("Payment transaction not found");
        }
        return payment;
    }
    async updateStatus(checkoutId, dto) {
        const updated = await this.paymentModel.findOneAndUpdate({ checkoutId }, {
            status: dto.status,
            transactionTimestamp: new Date(),
        }, {
            new: true,
        });
        if (!updated) {
            throw new common_1.NotFoundException("Payment transaction not found");
        }
        return updated;
    }
    async delete(id) {
        return this.paymentModel.findByIdAndDelete(id);
    }
};
exports.PaymentTransactionService = PaymentTransactionService;
exports.PaymentTransactionService = PaymentTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_transaction_schema_1.PaymentTransaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentTransactionService);
//# sourceMappingURL=payment-transaction.service.js.map
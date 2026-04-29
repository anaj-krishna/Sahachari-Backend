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
exports.PaymentTransactionController = void 0;
const common_1 = require("@nestjs/common");
const payment_transaction_service_1 = require("./payment-transaction.service");
const create_payment_transaction_dto_1 = require("./dto/create-payment-transaction.dto");
const update_payment_status_dto_1 = require("./dto/update-payment-status.dto");
const passport_1 = require("@nestjs/passport");
let PaymentTransactionController = class PaymentTransactionController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(dto, req) {
        const superAdminId = req.user.userId;
        return this.paymentService.create(dto, superAdminId);
    }
    findByDelivery(req) {
        const superAdminId = req.user.userId;
        return this.paymentService.findByDelivery(superAdminId);
    }
    findByCheckoutId(checkoutId) {
        return this.paymentService.findByCheckoutId(checkoutId);
    }
    updateStatus(checkoutId, dto) {
        return this.paymentService.updateStatus(checkoutId, dto);
    }
    delete(id) {
        return this.paymentService.delete(id);
    }
};
exports.PaymentTransactionController = PaymentTransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_transaction_dto_1.CreatePaymentTransactionDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "findByDelivery", null);
__decorate([
    (0, common_1.Get)(":checkoutId"),
    __param(0, (0, common_1.Param)("checkoutId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "findByCheckoutId", null);
__decorate([
    (0, common_1.Patch)(":checkoutId/status"),
    __param(0, (0, common_1.Param)("checkoutId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_status_dto_1.UpdatePaymentStatusDto]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "delete", null);
exports.PaymentTransactionController = PaymentTransactionController = __decorate([
    (0, common_1.Controller)("payment-transactions"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [payment_transaction_service_1.PaymentTransactionService])
], PaymentTransactionController);
//# sourceMappingURL=payment-transaction.controller.js.map
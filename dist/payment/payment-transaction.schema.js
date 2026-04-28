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
exports.PaymentTransactionSchema = exports.PaymentTransaction = exports.PaymentStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
let PaymentTransaction = class PaymentTransaction {
    paymentRs;
    upiId;
    superAdminId;
    checkoutId;
    status;
    transactionTimestamp;
};
exports.PaymentTransaction = PaymentTransaction;
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        min: 0,
    }),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "paymentRs", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "upiId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: "SuperAdmin",
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentTransaction.prototype, "superAdminId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        trim: true,
    }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "checkoutId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], PaymentTransaction.prototype, "transactionTimestamp", void 0);
exports.PaymentTransaction = PaymentTransaction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], PaymentTransaction);
exports.PaymentTransactionSchema = mongoose_1.SchemaFactory.createForClass(PaymentTransaction);
//# sourceMappingURL=payment-transaction.schema.js.map
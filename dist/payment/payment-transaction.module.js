"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payment_transaction_schema_1 = require("./payment-transaction.schema");
const payment_transaction_controller_1 = require("./payment-transaction.controller");
const payment_transaction_service_1 = require("./payment-transaction.service");
let PaymentTransactionModule = class PaymentTransactionModule {
};
exports.PaymentTransactionModule = PaymentTransactionModule;
exports.PaymentTransactionModule = PaymentTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: payment_transaction_schema_1.PaymentTransaction.name,
                    schema: payment_transaction_schema_1.PaymentTransactionSchema,
                },
            ]),
        ],
        controllers: [
            payment_transaction_controller_1.PaymentTransactionController,
        ],
        providers: [
            payment_transaction_service_1.PaymentTransactionService,
        ],
        exports: [
            payment_transaction_service_1.PaymentTransactionService,
        ],
    })
], PaymentTransactionModule);
//# sourceMappingURL=payment-transaction.module.js.map
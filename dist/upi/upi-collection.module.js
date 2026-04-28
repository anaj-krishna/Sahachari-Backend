"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpiCollectionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const upi_collection_schema_1 = require("./upi-collection.schema");
const upi_collection_controller_1 = require("./upi-collection.controller");
const upi_collection_service_1 = require("./upi-collection.service");
let UpiCollectionModule = class UpiCollectionModule {
};
exports.UpiCollectionModule = UpiCollectionModule;
exports.UpiCollectionModule = UpiCollectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: upi_collection_schema_1.UpiCollection.name,
                    schema: upi_collection_schema_1.UpiCollectionSchema,
                },
            ]),
        ],
        controllers: [upi_collection_controller_1.UpiCollectionController],
        providers: [upi_collection_service_1.UpiCollectionService],
        exports: [upi_collection_service_1.UpiCollectionService],
    })
], UpiCollectionModule);
//# sourceMappingURL=upi-collection.module.js.map
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
exports.UpiCollectionController = void 0;
const common_1 = require("@nestjs/common");
const upi_collection_service_1 = require("./upi-collection.service");
const create_upi_collection_dto_1 = require("./dto/create-upi-collection.dto");
const passport_1 = require("@nestjs/passport");
let UpiCollectionController = class UpiCollectionController {
    upiService;
    constructor(upiService) {
        this.upiService = upiService;
    }
    create(dto, req) {
        const superAdminId = req.user.userId;
        return this.upiService.create(dto, superAdminId);
    }
    findAll(req) {
        const superAdminId = req.user.userId;
        return this.upiService.findAll(superAdminId);
    }
    delete(id) {
        return this.upiService.delete(id);
    }
};
exports.UpiCollectionController = UpiCollectionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upi_collection_dto_1.CreateUpiCollectionDto, Object]),
    __metadata("design:returntype", void 0)
], UpiCollectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UpiCollectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UpiCollectionController.prototype, "delete", null);
exports.UpiCollectionController = UpiCollectionController = __decorate([
    (0, common_1.Controller)("upi-collection"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [upi_collection_service_1.UpiCollectionService])
], UpiCollectionController);
//# sourceMappingURL=upi-collection.controller.js.map
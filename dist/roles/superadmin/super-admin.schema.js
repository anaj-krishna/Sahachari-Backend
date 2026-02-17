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
exports.SuperAdminSchema = exports.SuperAdmin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SuperAdmin = class SuperAdmin extends mongoose_2.Document {
    name;
    email;
    password;
    location;
    mobileNumber;
    state;
    district;
    taluk;
    localBodyType;
    localBodyName;
    ward;
    addressLine1;
    pincode;
    role;
    storekeepers;
    deliveryBoys;
};
exports.SuperAdmin = SuperAdmin;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "mobileNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "district", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "taluk", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "localBodyType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "localBodyName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "ward", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "addressLine1", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SuperAdmin.prototype, "pincode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'SUPER_ADMIN' }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'Storekeeper' }],
        default: [],
    }),
    __metadata("design:type", Array)
], SuperAdmin.prototype, "storekeepers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'DeliveryBoy' }],
        default: [],
    }),
    __metadata("design:type", Array)
], SuperAdmin.prototype, "deliveryBoys", void 0);
exports.SuperAdmin = SuperAdmin = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SuperAdmin);
exports.SuperAdminSchema = mongoose_1.SchemaFactory.createForClass(SuperAdmin);
//# sourceMappingURL=super-admin.schema.js.map
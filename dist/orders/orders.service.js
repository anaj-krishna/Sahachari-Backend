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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const cart_service_1 = require("../cart/cart.service");
const product_schema_1 = require("../products/product.schema");
const users_service_1 = require("../users/users.service");
const delivery_charges_service_1 = require("../delivery-charges/delivery-charges.service");
let OrdersService = class OrdersService {
    orderModel;
    cartService;
    usersService;
    deliveryChargesService;
    productModel;
    constructor(orderModel, cartService, usersService, deliveryChargesService, productModel) {
        this.orderModel = orderModel;
        this.cartService = cartService;
        this.usersService = usersService;
        this.deliveryChargesService = deliveryChargesService;
        this.productModel = productModel;
    }
    async placeOrder(userId, dto) {
        const cart = await this.cartService.getCart(userId);
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        const checkoutId = `CHECKOUT-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        const deliveryCharge = await this.deliveryChargesService.getChargeForPincode(dto.zipCode);
        const itemsByStore = new Map();
        for (const item of cart.items) {
            const storeId = item.storeId.toString();
            if (!itemsByStore.has(storeId)) {
                itemsByStore.set(storeId, []);
            }
            itemsByStore.get(storeId).push(item);
        }
        const createdOrders = [];
        for (const [storeId, items] of itemsByStore.entries()) {
            let storeTotal = 0;
            const orderItems = [];
            const storeUser = await this.usersService.getById(storeId);
            if (!storeUser) {
                throw new common_1.NotFoundException(`Store/Admin user ${storeId} not found`);
            }
            for (const item of items) {
                const product = await this.productModel.findById(item.productId);
                if (!product) {
                    throw new common_1.NotFoundException(`Product ${item.productId.toString()} not found`);
                }
                const numericPrice = Number(String(product.price).replace(/[^0-9.]/g, ''));
                orderItems.push({
                    productId: product._id,
                    quantity: item.quantity,
                    price: numericPrice,
                });
                storeTotal += numericPrice * item.quantity;
            }
            const order = await this.orderModel.create({
                userId: new mongoose_2.Types.ObjectId(userId),
                storeId: new mongoose_2.Types.ObjectId(storeId),
                checkoutId,
                items: orderItems,
                itemsSubtotal: storeTotal,
                deliveryCharge,
                totalAmount: storeTotal + deliveryCharge,
                deliveryAddress: dto,
                pickupAddress: storeUser.address,
                status: 'PLACED',
            });
            createdOrders.push(order);
        }
        await this.cartService.clearCart(userId);
        return {
            checkoutId,
            ordersCount: createdOrders.length,
            totalAmount: createdOrders.reduce((sum, order) => sum + order.totalAmount, 0),
            orders: createdOrders,
        };
    }
    async placeSingleOrder(userId, dto) {
        const { productId, quantity, deliveryAddress } = dto;
        if (quantity <= 0) {
            throw new common_1.BadRequestException('Quantity must be greater than 0');
        }
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product ${productId} not found`);
        }
        const numericPrice = Number(String(product.price).replace(/[^0-9.]/g, ''));
        const itemsSubtotal = numericPrice * quantity;
        const deliveryCharge = await this.deliveryChargesService.getChargeForPincode(deliveryAddress.zipCode);
        const totalAmount = itemsSubtotal + deliveryCharge;
        const storeId = product.storeId.toString();
        const storeUser = await this.usersService.getById(storeId);
        if (!storeUser) {
            throw new common_1.NotFoundException(`Store/Admin user ${storeId} not found`);
        }
        const order = await this.orderModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            storeId: new mongoose_2.Types.ObjectId(storeId),
            checkoutId: `SINGLE-${Date.now()}`,
            items: [
                {
                    productId: product._id,
                    quantity,
                    price: numericPrice,
                },
            ],
            itemsSubtotal,
            deliveryCharge,
            totalAmount,
            deliveryAddress,
            pickupAddress: storeUser.address,
            status: 'PLACED',
        });
        return {
            message: 'Order placed successfully',
            order,
        };
    }
    async getOrders(userId, checkoutId) {
        const query = {
            userId: new mongoose_2.Types.ObjectId(userId),
        };
        if (checkoutId) {
            query.checkoutId = checkoutId;
        }
        return this.orderModel
            .find(query)
            .populate('items.productId')
            .populate('storeId', 'name')
            .sort({ createdAt: -1 });
    }
    async getOrdersByCheckout(userId, checkoutId) {
        return this.orderModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId), checkoutId })
            .populate('items.productId')
            .populate('storeId', 'name')
            .sort({ createdAt: -1 });
    }
    async getOrderById(userId, orderId) {
        const order = await this.orderModel
            .findOne({ _id: orderId, userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('items.productId');
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(orderId, newStatus, userId, userRole = 'CUSTOMER') {
        const transitionRules = {
            CUSTOMER: {
                CANCELLED: ['PLACED', 'ACCEPTED', 'READY'],
            },
            STOREKEEPER: {
                READY: ['PLACED'],
            },
            DELIVERY: {
                ACCEPTED: ['READY'],
                PICKED_UP: ['ACCEPTED'],
                DELIVERED: ['PICKED_UP'],
                FAILED: ['PICKED_UP'],
            },
        };
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const query = { _id: orderId };
        if (userRole === 'CUSTOMER') {
            query.userId = new mongoose_2.Types.ObjectId(userId);
            if (newStatus === 'CANCELLED' &&
                !transitionRules.CUSTOMER.CANCELLED.includes(order.status)) {
                throw new common_1.BadRequestException(`Cannot cancel order with status ${order.status}`);
            }
        }
        else if (userRole === 'STOREKEEPER') {
            query.storeId = new mongoose_2.Types.ObjectId(userId);
            if (!transitionRules.STOREKEEPER[newStatus]?.includes(order.status)) {
                throw new common_1.BadRequestException(`Cannot transition from ${order.status} to ${newStatus}`);
            }
        }
        else if (userRole === 'DELIVERY') {
            query.deliveryBoyId = new mongoose_2.Types.ObjectId(userId);
            if (newStatus !== 'ACCEPTED' &&
                !order.deliveryBoyId?.equals(new mongoose_2.Types.ObjectId(userId))) {
                throw new common_1.BadRequestException('Order not assigned to you');
            }
            if (!transitionRules.DELIVERY[newStatus]?.includes(order.status)) {
                throw new common_1.BadRequestException(`Cannot transition from ${order.status} to ${newStatus}`);
            }
        }
        if (userRole !== 'DELIVERY' || newStatus === 'ACCEPTED') {
            query.status = transitionRules[userRole][newStatus]?.[0] || order.status;
        }
        else {
            query.status = transitionRules.DELIVERY[newStatus]?.[0];
        }
        const updateObj = { $set: { status: newStatus } };
        if (userRole === 'DELIVERY' && newStatus === 'ACCEPTED') {
            updateObj.$set.deliveryBoyId = new mongoose_2.Types.ObjectId(userId);
            query.deliveryBoyId = null;
        }
        const updatedOrder = await this.orderModel.findOneAndUpdate(query, updateObj, {
            new: true,
        });
        if (!updatedOrder) {
            throw new common_1.NotFoundException(`Order not found or cannot transition to ${newStatus}`);
        }
        return updatedOrder;
    }
    async getOrdersByStore(storeId, status) {
        const query = {
            storeId: new mongoose_2.Types.ObjectId(storeId),
        };
        if (status) {
            query.status = status;
        }
        return this.orderModel
            .find(query)
            .populate('items.productId')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
    }
    async getStoreOrderById(storeId, orderId) {
        const order = await this.orderModel
            .findOne({
            _id: orderId,
            storeId: new mongoose_2.Types.ObjectId(storeId),
        })
            .populate('items.productId')
            .populate('userId', 'name email phone');
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async getAvailableDeliveryBoys(storeId, orderId) {
        const order = await this.orderModel.findOne({
            _id: orderId,
            storeId: new mongoose_2.Types.ObjectId(storeId),
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            orderId,
            availableDeliveryBoys: [],
            message: 'Delivery boy list not yet configured',
        };
    }
    async getAvailableJobs() {
        return this.orderModel
            .find({
            status: 'READY',
            deliveryBoyId: null,
        })
            .populate('items.productId')
            .populate('userId', 'name phone')
            .populate('storeId', 'name address phone')
            .sort({ createdAt: -1 });
    }
    async getMyJobs(deliveryBoyId) {
        return this.orderModel
            .find({
            deliveryBoyId: new mongoose_2.Types.ObjectId(deliveryBoyId),
            status: { $in: ['ACCEPTED', 'PICKED_UP', 'DELIVERED', 'FAILED'] },
        })
            .populate('items.productId')
            .populate('userId', 'name phone email')
            .populate('storeId', 'name address phone')
            .sort({ createdAt: -1 });
    }
    async getDeliveryOrderById(deliveryBoyId, orderId) {
        const order = await this.orderModel
            .findOne({
            _id: orderId,
            deliveryBoyId: new mongoose_2.Types.ObjectId(deliveryBoyId),
        })
            .populate('items.productId')
            .populate('userId', 'name phone email')
            .populate('storeId', 'name address phone')
            .populate('deliveryBoyId', 'name phone');
        if (!order) {
            throw new common_1.NotFoundException('Order not found or not assigned to you');
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(4, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        users_service_1.UsersService,
        delivery_charges_service_1.DeliveryChargesService,
        mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
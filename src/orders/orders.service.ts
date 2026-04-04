/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderItem } from './order.schema';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { calculateFinalPrice } from '../products/pricing';
import { PlaceOrderDto } from './dto/place-order.dto';
import { UsersService } from '../users/users.service';
import { PlaceSingleOrderDto } from './dto/place-single-order.dto';
import { DeliveryChargesService } from '../delivery-charges/delivery-charges.service';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    private readonly deliveryChargesService: DeliveryChargesService,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // PLACE ORDER → from cart, split by store
async placeOrder(userId: string, dto: PlaceOrderDto) {
  const { paymentMethod } = dto;

  const cart = await this.cartService.getCart(userId);

  if (!cart || cart.items.length === 0) {
    throw new BadRequestException('Cart is empty');
  }

  // Generate checkoutId
  const checkoutId = `CHECKOUT-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  const deliveryCharge =
    await this.deliveryChargesService.getChargeForPincode(dto.zipCode);

  // Group by store
  const itemsByStore = new Map<string, CartItem[]>();
  for (const item of cart.items) {
    const storeId = item.storeId.toString();
    if (!itemsByStore.has(storeId)) {
      itemsByStore.set(storeId, []);
    }
    itemsByStore.get(storeId)!.push(item);
  }

  const createdOrders: OrderDocument[] = [];

  for (const [storeId, items] of itemsByStore.entries()) {
    let storeTotal = 0;
    const orderItems: OrderItem[] = [];

    const storeUser = await this.usersService.getById(storeId);
    if (!storeUser) {
      throw new NotFoundException(`Store/Admin user ${storeId} not found`);
    }

    for (const item of items) {
      const product = await this.productModel.findById(item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product ${item.productId.toString()} not found`,
        );
      }

      const finalPrice = calculateFinalPrice(product);

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: finalPrice,
      });

      storeTotal += finalPrice * item.quantity;
    }

    const totalAmount = storeTotal + deliveryCharge;

    // 🔥 Payment Logic
    let paymentStatus = 'PENDING';
    let amountPaid = 0;

    if (paymentMethod === 'UPI') {
      paymentStatus = 'PENDING'; // wait for gateway success
    } else if (paymentMethod === 'CASH_ON_DELIVERY') {
      paymentStatus = 'PENDING';
    } else if (paymentMethod === 'SELF_PICKUP') {
      paymentStatus = 'PENDING'; // or SUCCESS if prepaid
    }

    const order = await this.orderModel.create({
      userId: new Types.ObjectId(userId),
      storeId: new Types.ObjectId(storeId),
      checkoutId,
      items: orderItems,
      itemsSubtotal: storeTotal,
      deliveryCharge,
      totalAmount,
      deliveryAddress: dto,
      pickupAddress: storeUser.address,
      status: 'PLACED',

      // ✅ Payment fields
      paymentMethod,
      paymentStatus,
      amountPaid,
      currency: 'INR',
    });

    createdOrders.push(order);
  }

  // Clear cart
  await this.cartService.clearCart(userId);

  return {
    checkoutId,
    ordersCount: createdOrders.length,
    totalAmount: createdOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    ),
    orders: createdOrders,
  };
}
async placeSingleOrder(userId: string, dto: PlaceSingleOrderDto) {
  const { productId, quantity, deliveryAddress, paymentMethod } = dto;

  if (quantity <= 0) {
    throw new BadRequestException('Quantity must be greater than 0');
  }

  const product = await this.productModel.findById(productId);
  if (!product) {
    throw new NotFoundException(`Product ${productId} not found`);
  }

  const finalPrice = calculateFinalPrice(product);
  const itemsSubtotal = finalPrice * quantity;

  const deliveryCharge =
    await this.deliveryChargesService.getChargeForPincode(
      deliveryAddress.zipCode,
    );

  const totalAmount = itemsSubtotal + deliveryCharge;

  const storeId = product.storeId.toString();
  const storeUser = await this.usersService.getById(storeId);
  if (!storeUser) {
    throw new NotFoundException(`Store/Admin user ${storeId} not found`);
  }

  // 🔥 Payment Logic
  let paymentStatus = 'PENDING';
  const  amountPaid = 0;

  if (paymentMethod === 'UPI') {
    paymentStatus = 'PENDING';
  } else if (paymentMethod === 'CASH_ON_DELIVERY') {
    paymentStatus = 'PENDING';
  } else if (paymentMethod === 'SELF_PICKUP') {
    paymentStatus = 'PENDING';
  }

  const order = await this.orderModel.create({
    userId: new Types.ObjectId(userId),
    storeId: new Types.ObjectId(storeId),
    checkoutId: `SINGLE-${Date.now()}`,
    items: [
      {
        productId: product._id,
        quantity,
        price: finalPrice,
      },
    ],
    itemsSubtotal,
    deliveryCharge,
    totalAmount,
    deliveryAddress,
    pickupAddress: storeUser.address,
    status: 'PLACED',

    // ✅ Payment
    paymentMethod,
    paymentStatus,
    amountPaid,
    currency: 'INR',
  });

  return {
    message: 'Order placed successfully',
    order,
  };
}
  // GET ALL ORDERS for user (optionally filter by checkout)
  async getOrders(userId: string, checkoutId?: string) {
    const query: { userId: Types.ObjectId; checkoutId?: string } = {
      userId: new Types.ObjectId(userId),
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

  // GET ORDERS BY CHECKOUT (all orders from one checkout session)
  async getOrdersByCheckout(userId: string, checkoutId: string) {
    return this.orderModel
      .find({ userId: new Types.ObjectId(userId), checkoutId })
      .populate('items.productId')
      .populate('storeId', 'name')
      .sort({ createdAt: -1 });
  }

  // GET SINGLE ORDER
  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({ _id: orderId, userId: new Types.ObjectId(userId) })
      .populate('items.productId');
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // GENERIC STATUS TRANSITION - Single function for all controllers
 async updateOrderStatus(
  orderId: string,
  newStatus: string,
  userId: string,
  userRole: 'CUSTOMER' | 'STOREKEEPER' | 'DELIVERY' = 'CUSTOMER',
): Promise<OrderDocument> {
  const transitionRules: Record<string, Record<string, string[]>> = {
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
    throw new NotFoundException('Order not found');
  }

  const query: Record<string, any> = { _id: orderId };

  /* ---------------- ROLE VALIDATION ---------------- */

  if (userRole === 'CUSTOMER') {
    query.userId = new Types.ObjectId(userId);

    if (
      newStatus === 'CANCELLED' &&
      !transitionRules.CUSTOMER.CANCELLED.includes(order.status)
    ) {
      throw new BadRequestException(
        `Cannot cancel order with status ${order.status}`,
      );
    }
  } else if (userRole === 'STOREKEEPER') {
    query.storeId = new Types.ObjectId(userId);

    if (!transitionRules.STOREKEEPER[newStatus]?.includes(order.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${newStatus}`,
      );
    }
  } else if (userRole === 'DELIVERY') {
    query.deliveryBoyId = new Types.ObjectId(userId);

    if (
      newStatus !== 'ACCEPTED' &&
      !order.deliveryBoyId?.equals(new Types.ObjectId(userId))
    ) {
      throw new BadRequestException('Order not assigned to you');
    }

    if (!transitionRules.DELIVERY[newStatus]?.includes(order.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${newStatus}`,
      );
    }
  }

  /* ---------------- BASE UPDATE ---------------- */

  let updateObj: Record<string, any> = {
    $set: { status: newStatus },
  };

  /* ---------------- RECEIPT GENERATOR 🔥 ---------------- */

  const generateReceiptString = (orderData: any) => {
    const itemsText = orderData.items
      .map(
        (item: any, i: number) =>
          `${i + 1}. Product: ${item.productId} | Qty: ${item.quantity} | Price: ${item.price}`,
      )
      .join(' || ');

    return `
ORDER RECEIPT
--------------------------------
Order ID: ${orderData._id}
Checkout ID: ${orderData.checkoutId}
User ID: ${orderData.userId}
Store ID: ${orderData.storeId}

Items:
${itemsText}

Subtotal: ₹${orderData.itemsSubtotal}
Delivery Charge: ₹${orderData.deliveryCharge}
Total: ₹${orderData.totalAmount}

Payment Method: ${orderData.paymentMethod}
Payment Status: SUCCESS

Delivery Address:
${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city} - ${orderData.deliveryAddress.zipCode}
Phone: ${orderData.deliveryAddress.phone}

Status: DELIVERED
Date: ${new Date().toISOString()}
--------------------------------
`;
  };

  /* ---------------- SELF PICKUP LOGIC 🔥 ---------------- */

  if (
    userRole === 'STOREKEEPER' &&
    newStatus === 'READY' &&
    order.paymentMethod === 'SELF_PICKUP'
  ) {
    updateObj = {
      $set: {
        status: 'DELIVERED',
        paymentStatus: 'SUCCESS',
        paidAt: new Date(),
        amountPaid: order.totalAmount,
        isPaymentVerified: true,
        receiptUrl: generateReceiptString(order), // storing string
      },
    };
  }

  /* ---------------- DELIVERY ACCEPT ---------------- */

  if (userRole === 'DELIVERY' && newStatus === 'ACCEPTED') {
    updateObj.$set.deliveryBoyId = new Types.ObjectId(userId);
    query.deliveryBoyId = null;
  }

  /* ---------------- DELIVERY COMPLETION 🔥 ---------------- */

  if (userRole === 'DELIVERY' && newStatus === 'DELIVERED') {
    updateObj.$set.paymentStatus = 'SUCCESS';
    updateObj.$set.amountPaid = order.totalAmount;
    updateObj.$set.paidAt = new Date();
    updateObj.$set.isPaymentVerified = true;

    updateObj.$set.receiptUrl = generateReceiptString(order);
  }

  /* ---------------- QUERY STATUS CHECK ---------------- */

  if (userRole !== 'DELIVERY' || newStatus === 'ACCEPTED') {
    query.status = transitionRules[userRole][newStatus]?.[0] || order.status;
  } else {
    query.status = transitionRules.DELIVERY[newStatus]?.[0];
  }

  /* ---------------- EXECUTE ---------------- */

  const updatedOrder = await this.orderModel.findOneAndUpdate(
    query,
    updateObj,
    { new: true },
  );

  if (!updatedOrder) {
    throw new NotFoundException(
      `Order not found or cannot transition to ${newStatus}`,
    );
  }

  return updatedOrder;
}

  /* ================= STOREKEEPER OPERATIONS ================= */

  // GET ORDERS BY STORE with optional status filter
  async getOrdersByStore(storeId: string, status?: string) {
    const query: { storeId: Types.ObjectId; status?: string } = {
      storeId: new Types.ObjectId(storeId),
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

  // GET SINGLE ORDER for store
  async getStoreOrderById(storeId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({
        _id: orderId,
        storeId: new Types.ObjectId(storeId),
      })
      .populate('items.productId')
      .populate('userId', 'name email phone');

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // GET AVAILABLE DELIVERY BOYS (placeholder - needs user service)
  async getAvailableDeliveryBoys(storeId: string, orderId: string) {
    // Verify order exists
    const order = await this.orderModel.findOne({
      _id: orderId,
      storeId: new Types.ObjectId(storeId),
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // TODO: Integrate with user service to get delivery boys
    // For now, return empty array - implement when user service is ready
    return {
      orderId,
      availableDeliveryBoys: [],
      message: 'Delivery boy list not yet configured',
    };
  }
  /* ================= DELIVERY BOY OPERATIONS ================= */

  // GET AVAILABLE JOBS (status = READY, no deliveryBoyId assigned)
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

  // GET MY JOBS (assigned to delivery boy)
  async getMyJobs(deliveryBoyId: string) {
    return this.orderModel
      .find({
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        status: { $in: ['ACCEPTED', 'PICKED_UP', 'DELIVERED', 'FAILED'] },
      })
      .populate('items.productId')
      .populate('userId', 'name phone email')
      .populate('storeId', 'name address phone')
      .sort({ createdAt: -1 });
  }

  // GET SINGLE ORDER FOR DELIVERY BOY
  async getDeliveryOrderById(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({
        _id: orderId,
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
      })
      .populate('items.productId')
      .populate('userId', 'name phone email')
      .populate('storeId', 'name address phone')
      .populate('deliveryBoyId', 'name phone');

    if (!order) {
      throw new NotFoundException('Order not found or not assigned to you');
    }

    return order;
  }
}

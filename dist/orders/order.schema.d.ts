import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
export declare enum PaymentMethod {
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    SELF_PICKUP = "SELF_PICKUP"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
export declare class OrderItem {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, (Document<unknown, any, OrderItem, any, import("mongoose").DefaultSchemaOptions> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, OrderItem, any, import("mongoose").DefaultSchemaOptions> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, OrderItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, OrderItem, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    productId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderItem>;
export declare class DeliveryAddress {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
    notes?: string;
}
export declare class Order {
    userId: Types.ObjectId;
    storeId: Types.ObjectId;
    checkoutId: string;
    deliveryBoyId?: Types.ObjectId;
    items: OrderItem[];
    itemsSubtotal: number;
    deliveryCharge: number;
    totalAmount: number;
    deliveryAddress: DeliveryAddress;
    pickupAddress: any;
    status: 'PLACED' | 'ACCEPTED' | 'REJECTED' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    transactionId?: string;
    paymentGateway?: string;
    paidAt?: Date;
    paymentResponse?: any;
    amountPaid?: number;
    isPaymentVerified?: boolean;
    currency?: string;
    receiptUrl?: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    storeId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    checkoutId?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryBoyId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<OrderItem[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    itemsSubtotal?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryCharge?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalAmount?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryAddress?: import("mongoose").SchemaDefinitionProperty<DeliveryAddress, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pickupAddress?: import("mongoose").SchemaDefinitionProperty<any, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"REJECTED" | "FAILED" | "PLACED" | "ACCEPTED" | "READY" | "PICKED_UP" | "DELIVERED" | "CANCELLED", Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentMethod?: import("mongoose").SchemaDefinitionProperty<PaymentMethod, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentStatus?: import("mongoose").SchemaDefinitionProperty<PaymentStatus, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    transactionId?: import("mongoose").SchemaDefinitionProperty<string | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentGateway?: import("mongoose").SchemaDefinitionProperty<string | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paidAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentResponse?: import("mongoose").SchemaDefinitionProperty<any, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amountPaid?: import("mongoose").SchemaDefinitionProperty<number | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPaymentVerified?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<string | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    receiptUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Order>;

# 🛍️ CUSTOMER API DOCUMENTATION

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Products](#products)
3. [Cart Management](#cart-management)
4. [Orders](#orders)
5. [User Profile](#user-profile)

---

## Authentication

### 1. Register (Customer)
**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER",
  "address": "123 Main Street, New York",
  "serviceablePincodes": ["10001", "10002"]
}
```

**Response:** `201 Created`
```json
{
  "id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "email": "john@example.com",
  "role": "USER",
  "status": "ACTIVE",
  "message": "Registration successful"
}
```

**Validation:**
- `name`: Required, string
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `role`: Required, one of [USER, DELIVERY, ADMIN]
- `address`: Required, string
- `serviceablePincodes`: Required, non-empty array of strings

---

### 2. Login
**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

## User Profile

### Get Profile
**Endpoint:** `GET /users/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
{
  "_id": "user_id_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "address": "123 Main Street, New York",
  "serviceablePincodes": ["10001", "10002"],
  "status": "ACTIVE",
  "isVerified": false,
  "mobileNumber": "9999999999",
  "address2": "Apt 4B",
  "image": null,
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:00:00.000Z"
}
```

---

## Products

### 1. Get All Products (with Search & Filter)
**Endpoint:** `GET /customer/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `search` (optional): Search by product name
- `category` (optional): Filter by category

**Examples:**
```
GET /customer/products
GET /customer/products?search=laptop
GET /customer/products?category=Electronics
GET /customer/products?search=laptop&category=Electronics
```

**Response:** `200 OK`
```json
[
  {
    "_id": "prod_1",
    "storeId": "store_1",
    "name": "Laptop Pro",
    "description": "High-performance laptop",
    "price": "50000",
    "finalPrice": 45000,
    "quantity": 10,
    "category": "Electronics",
    "images": ["img1.jpg", "img2.jpg"],
    "offers": [
      {
        "type": "PERCENTAGE",
        "value": 10,
        "isActive": true,
        "startDate": "2025-01-01T00:00:00.000Z",
        "endDate": "2025-12-31T23:59:59.000Z"
      }
    ]
  }
]
```

---

### 2. Get Single Product
**Endpoint:** `GET /customer/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Example:**
```
GET /customer/products/65f4a3c9d1e2f3g4h5i6j7k8
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "storeId": "store_1",
  "name": "Laptop Pro",
  "description": "High-performance laptop",
  "price": "50000",
  "finalPrice": 45000,
  "quantity": 10,
  "category": "Electronics",
  "images": ["img1.jpg", "img2.jpg"],
  "offers": [
    {
      "type": "PERCENTAGE",
      "value": 10,
      "isActive": true,
      "startDate": "2025-01-01T00:00:00.000Z",
      "endDate": "2025-12-31T23:59:59.000Z"
    }
  ]
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Product not found"
}
```

---

### 3. Get All Stores
**Endpoint:** `GET /customer/stores`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
[
  "store_id_1",
  "store_id_2",
  "store_id_3"
]
```

---

### 4. Get Stores by Category (Serviceable Area)
**Endpoint:** `GET /customer/category/:category/stores`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `category`: Category name

**Example:**
```
GET /customer/category/Fruits/stores
```

**Response:** `200 OK`
```json
[
  {
    "category": "Fruits",
    "stores": [
      {
        "_id": "store_id_1",
        "name": "Storekeeper One",
        "role": "ADMIN",
        "serviceablePincodes": ["560001", "560002"]
      }
    ]
  }
]
```

**Notes:**
- Stores are filtered to those whose `serviceablePincodes` intersect with the logged-in user's `serviceablePincodes`.

---

### 5. Get Products by Store
**Endpoint:** `GET /customer/stores/:id/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Store ID (User ID of storekeeper)

**Example:**
```
GET /customer/stores/65f4a3c9d1e2f3g4h5i6j7k8/products
```

**Response:** `200 OK`
```json
[
  {
    "_id": "prod_1",
    "storeId": "store_1",
    "name": "Laptop Pro",
    "price": "50000",
    "finalPrice": 45000,
    "quantity": 10,
    "category": "Electronics"
  },
  {
    "_id": "prod_2",
    "storeId": "store_1",
    "name": "Mouse Wireless",
    "price": "1500",
    "finalPrice": 1500,
    "quantity": 50,
    "category": "Accessories"
  }
]
```

---

## Cart Management

### 1. Get Cart
**Endpoint:** `GET /customer/cart`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
{
  "_id": "cart_123",
  "userId": "user_id_123",
  "items": [
    {
      "_id": "item_1",
      "productId": "prod_1",
      "storeId": "store_1",
      "quantity": 2
    },
    {
      "_id": "item_2",
      "productId": "prod_2",
      "storeId": "store_2",
      "quantity": 1
    }
  ],
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:15:00.000Z"
}
```

**Note:** Returns empty cart if none exists:
```json
{
  "userId": "user_id_123",
  "items": []
}
```

---

### 2. Add to Cart
**Endpoint:** `POST /customer/cart`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "65f4a3c9d1e2f3g4h5i6j7k8",
  "quantity": 2
}
```

**Response:** `201 Created`
```json
{
  "_id": "cart_123",
  "userId": "user_id_123",
  "items": [
    {
      "_id": "item_1",
      "productId": "65f4a3c9d1e2f3g4h5i6j7k8",
      "storeId": "store_1",
      "quantity": 2
    }
  ]
}
```

**Validation:**
- `productId`: Required, valid MongoDB ID
- `quantity`: Required, minimum 1

**Auto-Behaviors:**
- If product already in cart, quantity is updated (added to existing quantity)
- `storeId` is automatically captured from the product
- Cart is created if it doesn't exist

**Error Responses:**
```json
{
  "statusCode": 404,
  "message": "Product not found"
}
```

---

### 3. Remove Item from Cart
**Endpoint:** `DELETE /customer/cart/:itemId`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `itemId`: The subdocument ID of the cart item (not product ID)

**Example:**
```
DELETE /customer/cart/item_1
```

**Response:** `200 OK`
```json
{
  "_id": "cart_123",
  "userId": "user_id_123",
  "items": []
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Cart not found"
}
```

---

### 4. Update Cart Item Quantity
**Endpoint:** `PATCH /customer/cart/:itemId`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `itemId`: The subdocument ID of the cart item

**Body:**
```json
{
  "quantity": 3
}
```

**Response:** `200 OK` (updated cart)

**Validation:**
- `quantity`: Required, number, minimum 1

---

## Orders

### 1. Place Order (Multi-Store)
**Endpoint:** `POST /customer/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "street": "123 Main Street",
  "city": "New York",
  "zipCode": "10001",
  "phone": "+1-234-567-8900",
  "notes": "Please deliver after 5 PM"
}
```

**Response:** `201 Created`
```json
{
  "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
  "ordersCount": 2,
  "totalAmount": 5500,
  "orders": [
    {
      "_id": "order_1",
      "userId": "user_id_123",
      "storeId": "store_1",
      "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
      "items": [
        {
          "_id": "order_item_1",
          "productId": "prod_1",
          "quantity": 2,
          "price": 50000
        }
      ],
      "totalAmount": 100000,
      "deliveryAddress": {
        "street": "123 Main Street",
        "city": "New York",
        "zipCode": "10001",
        "phone": "+1-234-567-8900",
        "notes": "Please deliver after 5 PM"
      },
      "pickupAddress": "Store Address, City",
      "status": "PLACED",
      "createdAt": "2025-01-19T10:00:00.000Z",
      "updatedAt": "2025-01-19T10:00:00.000Z"
    },
    {
      "_id": "order_2",
      "userId": "user_id_123",
      "storeId": "store_2",
      "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
      "items": [
        {
          "_id": "order_item_2",
          "productId": "prod_2",
          "quantity": 1,
          "price": 1500
        }
      ],
      "totalAmount": 1500,
      "deliveryAddress": {
        "street": "123 Main Street",
        "city": "New York",
        "zipCode": "10001",
        "phone": "+1-234-567-8900",
        "notes": "Please deliver after 5 PM"
      },
      "pickupAddress": "Store Address, City",
      "status": "PLACED",
      "createdAt": "2025-01-19T10:00:00.000Z",
      "updatedAt": "2025-01-19T10:00:00.000Z"
    }
  ]
}
```

**Validation:**
- `street`: Required, minimum 5 characters
- `city`: Required, minimum 2 characters
- `zipCode`: Required, minimum 5 characters
- `phone`: Required, valid phone number format
- `notes`: Optional, string

**Key Features:**
- ✅ Creates one order per store automatically
- ✅ All orders share same `checkoutId`
- ✅ Cart is cleared after successful order
- ✅ Price snapshot captured at order time
- ✅ Each order has independent delivery

**Error Responses:**
```json
{
  "statusCode": 400,
  "message": "Cart is empty"
}
```

---

### 2. Place Single Product Order
**Endpoint:** `POST /customer/single-order`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "65f4a3c9d1e2f3g4h5i6j7k8",
  "quantity": 1,
  "deliveryAddress": {
    "street": "123 Main Street",
    "city": "New York",
    "zipCode": "10001",
    "phone": "+1-234-567-8900",
    "notes": "Leave at door"
  }
}
```

**Response:** `201 Created` (or `200 OK` depending on server)
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "order_123",
    "userId": "user_id_123",
    "storeId": "store_1",
    "checkoutId": "SINGLE-1705684920123",
    "items": [
      {
        "_id": "order_item_1",
        "productId": "65f4a3c9d1e2f3g4h5i6j7k8",
        "quantity": 1,
        "price": 50000
      }
    ],
    "totalAmount": 50000,
    "deliveryAddress": {
      "street": "123 Main Street",
      "city": "New York",
      "zipCode": "10001",
      "phone": "+1-234-567-8900",
      "notes": "Leave at door"
    },
    "pickupAddress": "Store Address, City",
    "status": "PLACED",
    "createdAt": "2025-01-19T10:00:00.000Z"
  }
}
```

**Validation:**
- `productId`: Required, valid MongoDB ID
- `quantity`: Required, integer, minimum 1
- `deliveryAddress`: Required, same fields as `PlaceOrderDto`

**Errors:**
- `400` Quantity must be greater than 0
- `404` Product not found

---

### 2. Get All Orders
**Endpoint:** `GET /customer/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Note:** This endpoint does not currently support filtering by `checkoutId`.

**Response:** `200 OK`
```json
[
  {
    "_id": "order_1",
    "userId": "user_id_123",
    "storeId": {
      "_id": "store_1",
      "name": "Main Store"
    },
    "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
    "items": [
      {
        "_id": "order_item_1",
        "productId": {
          "_id": "prod_1",
          "name": "Laptop Pro",
          "price": "50000"
        },
        "quantity": 2,
        "price": 50000
      }
    ],
    "totalAmount": 100000,
    "deliveryAddress": {...},
    "status": "PLACED",
    "createdAt": "2025-01-19T10:00:00.000Z"
  }
]
```

---

### 3. Get Single Order
**Endpoint:** `GET /customer/orders/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Order ID

**Example:**
```
GET /customer/orders/65f4a3c9d1e2f3g4h5i6j7k8
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "userId": "user_id_123",
  "storeId": "store_1",
  "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
  "items": [
    {
      "_id": "order_item_1",
      "productId": {
        "_id": "prod_1",
        "storeId": "store_1",
        "name": "Laptop Pro",
        "price": "50000",
        "quantity": 10,
        "category": "Electronics",
        "offers": []
      },
      "quantity": 2,
      "price": 50000
    }
  ],
  "totalAmount": 100000,
  "deliveryAddress": {
    "street": "123 Main Street",
    "city": "New York",
    "zipCode": "10001",
    "phone": "+1-234-567-8900",
    "notes": "Please deliver after 5 PM"
  },
  "status": "PLACED",
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:00:00.000Z"
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Order not found"
}
```

---

### 4. Cancel Order
**Endpoint:** `POST /customer/orders/:id/cancel`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Order ID to cancel

**Example:**
```
POST /customer/orders/65f4a3c9d1e2f3g4h5i6j7k8/cancel
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "userId": "user_id_123",
  "storeId": "store_1",
  "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
  "items": [...],
  "totalAmount": 100000,
  "deliveryAddress": {...},
  "status": "CANCELLED",
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:05:00.000Z"
}
```

**Restrictions:**
- ✅ Can cancel only while status is `PLACED`, `READY`, or `ACCEPTED`
- ❌ Cannot cancel once status is `PICKED_UP`, `DELIVERED`, or `FAILED`

**Error Responses:**
```json
{
  "statusCode": 404,
  "message": "Order not found"
}
```

```json
{
  "statusCode": 400,
  "message": "Cannot cancel order with status PICKED_UP"
}
```

---

## 🔐 Authentication & Authorization

### JWT Token
All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

### Token Structure
```json
{
  "sub": "65f4a3c9d1e2f3g4h5i6j7k8",
  "email": "john@example.com",
  "role": "USER",
  "status": "ACTIVE",
  "iat": 1705684800,
  "exp": 1705771200
}
```

### Role-Based Access
- ✅ Only users with role `USER` can access customer endpoints
- ✅ Other roles (ADMIN, STOREKEEPER, DELIVERY) have their own routes

---

## 📊 Complete Workflow Example

```bash
# 1️⃣ Register
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
→ Get: accessToken

# 2️⃣ View Products
GET /customer/products
GET /customer/stores
GET /customer/stores/{storeId}/products

# 3️⃣ Add to Cart from Multiple Stores
POST /customer/cart
{ "productId": "prod_1", "quantity": 2 }
→ Item from Store A added

POST /customer/cart
{ "productId": "prod_2", "quantity": 1 }
→ Item from Store B added

# 4️⃣ View Cart
GET /customer/cart
→ Shows both items

# 5️⃣ Place Order (Auto-splits)
POST /customer/orders
{ "street": "...", "city": "...", "zipCode": "...", "phone": "..." }
→ Creates 2 orders (one per store) with same checkoutId

# 6️⃣ Get Orders
GET /customer/orders

# 7️⃣ Cancel Order
POST /customer/orders/{orderId}/cancel
```

---

## 🚨 Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Validation errors or business rule errors (e.g., Cart is empty) |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions (not a USER) |
| 404 | Not found | Resource doesn't exist |
| 500 | Internal server error | Server-side error |

---

## 💡 Best Practices

1. **Always save JWT token** after login for subsequent requests
2. **Clear cart after order placement** - happens automatically
3. **Use checkoutId** to track all orders from one purchase session
4. **Validate delivery address** - required for order placement
5. **Search by product name** for better UX
6. **Filter by category** to organize products
7. **Check product quantity** before adding to cart
8. **Handle storeId internally** - automatically captured from products

---

## 📝 Rate Limiting & Pagination

Currently no rate limiting implemented. Future versions may include:
- Request rate limiting per user
- Pagination for large product/order lists
- Search result pagination

---

## 🔄 WebSocket Events (Future)

Planned for real-time updates:
- Order status changes
- Product stock updates
- Store notifications
- Delivery tracking

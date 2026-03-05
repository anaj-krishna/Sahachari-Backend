# 📦 STOREKEEPER API DOCUMENTATION

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Products Management](#products-management)
3. [Orders Management](#orders-management)
4. [Order Actions](#order-actions)
5. [Delivery Assignment](#delivery-assignment)

---

## 🔐 Authentication

### Admin Registration
**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "ABCG",
  "email": "abc@store.com",
  "password": "123456",
  "role": "ADMIN",
  "address": "Store Address, City",
  "serviceablePincodes": ["560001", "560002"]
}
```

**Response:** `201 Created`
```json
{
  "id": "696dc7c4d941d2c9a8f56e4d",
  "email": "abc@store.com",
  "role": "ADMIN",
  "status": "ACTIVE",
  "message": "Registration successful. Awaiting admin approval."
}
```

**Validation:**
- `name`: Required, string
- `email`: Required, valid email format
- `password`: Required, string (minimum 6 characters)
- `role`: Required, must be "ADMIN" for storekeeper registration
 - `address`: Required, string
 - `serviceablePincodes`: Required, non-empty array of strings

**Note:** Protected endpoints require `status=ACTIVE` (enforced by role guard).

### Login
**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "abc@store.com",
  "password": "123456"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Products Management

### 1. Create Product
**Endpoint:** `POST /storekeeper/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Laptop Pro",
  "description": "High-performance laptop with 16GB RAM",
  "price": "50000",
  "quantity": 10,
  "category": "Electronics",
  "images": ["img1.jpg", "img2.jpg"]
}
```

**Response:** `201 Created`
```json
{
  "_id": "prod_1",
  "storeId": "store_id_123",
  "name": "Laptop Pro",
  "description": "High-performance laptop with 16GB RAM",
  "price": "50000",
  "quantity": 10,
  "category": "Electronics",
  "images": ["img1.jpg", "img2.jpg"],
  "offers": [],
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:00:00.000Z"
}
```

**Validation:**
- `name`: Required, string
- `price`: Required, string
- `quantity`: Required, number
- `description`: Optional, string
- `category`: Optional, string
- `images`: Optional, array of strings

---

### 2. Get All Store Products
**Endpoint:** `GET /storekeeper/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
[
  {
    "_id": "prod_1",
    "storeId": "store_id_123",
    "name": "Laptop Pro",
    "price": "50000",
    "finalPrice": 45000,
    "quantity": 10,
    "category": "Electronics",
    "description": "High-performance laptop",
    "images": ["img1.jpg"],
    "offers": []
  },
  {
    "_id": "prod_2",
    "storeId": "store_id_123",
    "name": "Mouse Wireless",
    "price": "1500",
    "finalPrice": 1500,
    "quantity": 50,
    "category": "Accessories"
  }
]
```

---

### 3. Get Single Product
**Endpoint:** `GET /storekeeper/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Example:**
```
GET /storekeeper/products/65f4a3c9d1e2f3g4h5i6j7k8
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "storeId": "store_id_123",
  "name": "Laptop Pro",
  "description": "High-performance laptop",
  "price": "50000",
  "finalPrice": 45000,
  "quantity": 10,
  "category": "Electronics",
  "images": ["img1.jpg"],
  "offers": []
}
```

---

### 4. Update Product
**Endpoint:** `PUT /storekeeper/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Body:** (all fields optional)
```json
{
  "name": "Laptop Pro Max",
  "description": "Updated description",
  "price": "55000",
  "quantity": 15,
  "category": "Electronics",
  "images": ["new_img1.jpg", "new_img2.jpg"]
}
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "storeId": "store_id_123",
  "name": "Laptop Pro Max",
  "description": "Updated description",
  "price": "55000",
  "quantity": 15,
  "category": "Electronics",
  "images": ["new_img1.jpg", "new_img2.jpg"],
  "offers": []
}
```

---

### 5. Delete Product
**Endpoint:** `DELETE /storekeeper/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Example:**
```
DELETE /storekeeper/products/65f4a3c9d1e2f3g4h5i6j7k8
```

**Response:** `200 OK`
```json
{
  "message": "Product deleted successfully"
}
```

---

## Offers

### 1. Add Offer to Product
**Endpoint:** `POST /storekeeper/products/:id/offer`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Body:**
```json
{
  "type": "PERCENTAGE", // or "FLAT"
  "value": 10,
  "startDate": "2025-01-01T00:00:00.000Z", // optional
  "endDate": "2025-12-31T23:59:59.000Z" // optional
}
```

**Response:** `200 OK`
```json
{
  "_id": "prod_1",
  "storeId": "store_id_123",
  "name": "Laptop Pro",
  "price": "50000",
  "quantity": 10,
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

**Validation:**
- `type`: Required, `PERCENTAGE` or `FLAT`
- `value`: Required, number

**Errors:**
- `404` Product not found

---

### 2. Delete Single Offer
**Endpoint:** `DELETE /storekeeper/products/:id/offer`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Response:** `200 OK` (product with the offer removed)
```json
{
  "_id": "prod_1",
  "offers": []
}
```

**Errors:**
- `404` Product not found
- `404` No offers to delete

---

### 6. Update Stock
**Endpoint:** `PATCH /storekeeper/products/:id/stock`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `id`: Product MongoDB ID

**Body:**
```json
{
  "quantity": 25
}
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "storeId": "store_id_123",
  "name": "Laptop Pro",
  "quantity": 25,
  "price": "50000"
}
```

**Validation:**
- `quantity`: Required, number, minimum 0

---

## Orders Management

### 1. Get Store Orders (with optional status filter)
**Endpoint:** `GET /storekeeper/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `status` (optional): Filter by order status (PLACED, READY, ACCEPTED, PICKED_UP, DELIVERED, FAILED, CANCELLED)

**Examples:**
```
GET /storekeeper/orders
GET /storekeeper/orders?status=PLACED
GET /storekeeper/orders?status=ACCEPTED
GET /storekeeper/orders?status=READY
```

**Response:** `200 OK`
```json
[
  {
    "_id": "order_1",
    "userId": {
      "_id": "customer_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "storeId": "store_id_123",
    "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
    "items": [
      {
        "_id": "order_item_1",
        "productId": {
          "_id": "prod_1",
          "name": "Laptop Pro",
          "price": "50000"
        },
        "quantity": 1,
        "price": 50000
      }
    ],
    "totalAmount": 50000,
    "pickupAddress": "Store Address, City",
    "deliveryAddress": {
      "street": "123 Main Street",
      "city": "New York",
      "zipCode": "10001",
      "phone": "+1-234-567-8900"
    },
    "status": "PLACED",
    "deliveryBoyId": null,
    "createdAt": "2025-01-19T10:00:00.000Z"
  }
]
```

---

### 2. Get Single Order
**Endpoint:** `GET /storekeeper/orders/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Order MongoDB ID

**Example:**
```
GET /storekeeper/orders/65f4a3c9d1e2f3g4h5i6j7k8
```

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "userId": {
    "_id": "customer_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "storeId": "store_id_123",
  "checkoutId": "CHECKOUT-1705684920123-abc9d3f",
  "items": [
    {
      "_id": "order_item_1",
      "productId": {
        "_id": "prod_1",
        "name": "Laptop Pro",
        "price": "50000"
      },
      "quantity": 1,
      "price": 50000
    }
  ],
  "totalAmount": 50000,
  "pickupAddress": "Store Address, City",
  "deliveryAddress": {
    "street": "123 Main Street",
    "city": "New York",
    "zipCode": "10001",
    "phone": "+1-234-567-8900"
  },
  "status": "PLACED",
  "deliveryBoyId": null,
  "createdAt": "2025-01-19T10:00:00.000Z"
}
```

---

## Order Actions

### 1. Mark Order as Ready
**Endpoint:** `POST /storekeeper/orders/:id/ready`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Order MongoDB ID

**Example:**
```
POST /storekeeper/orders/65f4a3c9d1e2f3g4h5i6j7k8/ready
```

**Precondition:**
- Order status must be `PLACED`

**Response:** `200 OK`
```json
{
  "_id": "65f4a3c9d1e2f3g4h5i6j7k8",
  "status": "READY",
  "updatedAt": "2025-01-19T10:10:00.000Z"
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Order not found or cannot transition to READY"
}
```

**Error Response (wrong status):**
```json
{
  "statusCode": 400,
  "message": "Cannot transition from ACCEPTED to READY",
  "error": "Bad Request"
}
```

---

## Delivery Assignment

### 1. Get Available Delivery Boys
**Endpoint:** `GET /storekeeper/orders/:id/available-delivery`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id`: Order MongoDB ID

**Example:**
```
GET /storekeeper/orders/65f4a3c9d1e2f3g4h5i6j7k8/available-delivery
```

**Response:** `200 OK`
```json
{
  "orderId": "65f4a3c9d1e2f3g4h5i6j7k8",
  "availableDeliveryBoys": [],
  "message": "Delivery boy list not yet configured"
}
```

**Note:** This is currently a placeholder and always returns an empty list.

---

### 2. Assign Delivery Boy (Not Implemented)
This endpoint is not implemented in the current codebase. Storekeeper can list available delivery partners, but assigning a delivery partner to an order is pending implementation.

---

## 📊 Order Status Flow

```
PLACED (Order received)
  ↓
READY (Storekeeper marks as ready)
  ↓
ACCEPTED (Delivery partner accepts)
  ↓
PICKED_UP (Delivery partner picks up)
  ↓
DELIVERED (Delivered)  OR  FAILED (Delivery failed)
```

---

## JWT Token Usage

All protected storekeeper endpoints require:
```
Authorization: Bearer <jwt_token>
```

**Required Role:** `ADMIN`

---

## 📝 Complete Workflow Example

```bash
# 1️⃣ Create a product
POST /storekeeper/products
{
  "name": "Laptop",
  "price": "50000",
  "quantity": 10
}

# 2️⃣ View all products
GET /storekeeper/products

# 3️⃣ Update stock
PATCH /storekeeper/products/{productId}/stock
{ "quantity": 8 }

# 4️⃣ Get pending orders
GET /storekeeper/orders?status=PLACED

# 5️⃣ View order details
GET /storekeeper/orders/{orderId}

# 6️⃣ Mark as ready
POST /storekeeper/orders/{orderId}/ready

# 7️⃣ Get available delivery boys
GET /storekeeper/orders/{orderId}/available-delivery

# 8️⃣ Assign delivery boy
POST /storekeeper/orders/{orderId}/assign-delivery
{ "deliveryBoyId": "delivery_id_123" }
```

---

## 🚨 Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Validation errors or business rule errors |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Not a STOREKEEPER role |
| 404 | Not Found | Resource doesn't exist or wrong status |
| 500 | Internal Server Error | Server-side error |

---

## 💡 Best Practices

1. **Monitor PLACED orders** - Check regularly for new orders
2. **Mark READY promptly** - Once order is packaged
3. **Keep stock updated** - Avoid overselling
4. **Assign delivery ASAP** - Once assignment is implemented
5. **Track order status** - Keep customers informed
6. **Use status filters** - `GET /storekeeper/orders?status=PLACED` to see new orders only

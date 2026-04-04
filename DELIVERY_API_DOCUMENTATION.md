# Delivery Partner API Documentation

## Overview
API endpoints for delivery partners to manage delivery jobs. All endpoints (except authentication) require JWT authentication with `DELIVERY` role.

---

## Authentication

### Register Delivery Partner
**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "name": "Test User",
  "email": "newuser123@store.com",
  "password": "123456",
  "role": "DELIVERY",
  "address": "456 Delivery St, San Francisco",
  "serviceablePincodes": ["94102", "94103"]
}
```

**Response (201):**
```json
{
  "id": "user_id",
  "email": "newuser123@store.com",
  "role": "DELIVERY",
  "status": "ACTIVE",
  "message": "Registration successful. Awaiting admin approval."
}
```

### Login
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "aaa.delivery@gmail.com",
  "password": "Test@123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note:** Include the token in all subsequent requests:
```
Authorization: Bearer <token>
```

---

## Order Management

### Get Available Jobs (or My Jobs)
**Endpoint:** `GET /delivery/orders?status=READY` or `GET /delivery/orders?mine=true`

**Description:**
- `status=READY`: Lists all unassigned orders ready for pickup
- `mine=true`: Returns orders assigned to the authenticated delivery partner (same as `GET /delivery/orders/me`)

**Note:** If you call `GET /delivery/orders` without `status=READY` or `mine=true`, the API currently returns an empty array.

**Examples:**
```
GET /delivery/orders?status=READY
GET /delivery/orders?mine=true
```

**Response:**
```json
[
  {
    "_id": "order_123",
    "userId": {
      "_id": "user_456",
      "name": "John Doe"
    },
    "storeId": {
      "_id": "store_789",
      "name": "Main Store",
      "address": "123 Main St"
    },
    "items": [
      {
        "productId": {
          "_id": "prod_101",
          "name": "Product Name",
          "price": "10.99"
        },
        "quantity": 2,
        "price": 10.99
      }
    ],
    "totalAmount": 21.98,
    "deliveryAddress": {
      "street": "456 Delivery St",
      "city": "San Francisco",
      "zipCode": "94102",
      "phone": "+1111111111",
      "notes": "Ring doorbell twice"
    },
    "status": "READY",
    "deliveryBoyId": null,
    "createdAt": "2025-01-19T10:00:00.000Z",
    "updatedAt": "2025-01-19T10:00:00.000Z"
  }
]
```

### Get My Assigned Jobs
**Endpoint:** `GET /delivery/orders/me`

**Description:** Returns all orders assigned to the authenticated delivery partner

**Response:** Same structure as available jobs, but filtered by `deliveryBoyId`

### Get Order Details
**Endpoint:** `GET /delivery/orders/:id`

**Description:** Fetch details of a specific order (must be assigned to you)

**Response:** Single order object with full details

---

## Delivery Workflow

### 1. Accept Job
**Endpoint:** `POST /delivery/orders/:id/accept`

**Status:** `READY → ACCEPTED`

**Description:** Accept an available delivery job

**Request:** Empty body `{}`

**Response:** Updated order with `deliveryBoyId` assigned and status changed to `ACCEPTED`

### 2. Pickup Order
**Endpoint:** `POST /delivery/orders/:id/pickup`

**Status:** `ACCEPTED → PICKED_UP`

**Description:** Confirm package picked up from store

**Request:** Empty body `{}`

**Response:** Updated order with status `PICKED_UP`

### 3a. Deliver Order (Success)
**Endpoint:** `POST /delivery/orders/:id/deliver`

**Status:** `PICKED_UP → DELIVERED`

**Description:** Mark delivery as completed successfully

**Request:** Empty body `{}`

**Response:** Updated order with status `DELIVERED`

### 3b. Fail Delivery (Failure)
**Endpoint:** `POST /delivery/orders/:id/fail`

**Status:** `PICKED_UP → FAILED`

**Description:** Mark delivery as failed (customer unavailable, wrong address, etc.)

**Request:** Empty body `{}`

**Response:** Updated order with status `FAILED`

---

## Order Status Flow

```
PLACED → READY (Storekeeper) → ACCEPTED (Delivery) → PICKED_UP →
  ↓                                             ↓
DELIVERED                                  FAILED
```

---

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Invalid input |
| 400 | Bad Request - Action not allowed in current status (`Cannot transition from <STATUS> to <NEW_STATUS>`) |
| 400 | Bad Request - Order not assigned to you (for pickup/deliver/fail when not assigned) |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Not a delivery partner |
| 404 | Not Found - Order doesn't exist / cannot transition (`Order not found or cannot transition to <NEW_STATUS>`) |
| 404 | Not Found - Order doesn't exist or not assigned to you |
| 500 | Server Error |

**Example Error:**
```json
{
  "statusCode": 404,
  "message": "Order not found or not assigned to you",
  "error": "Not Found"
}
```

**Example Transition Error (status invalid):**
```json
{
  "statusCode": 400,
  "message": "Cannot transition from PLACED to ACCEPTED",
  "error": "Bad Request"
}
```

**Example Transition Error (order not found / already taken):**
```json
{
  "statusCode": 404,
  "message": "Order not found or cannot transition to ACCEPTED",
  "error": "Not Found"
}
```

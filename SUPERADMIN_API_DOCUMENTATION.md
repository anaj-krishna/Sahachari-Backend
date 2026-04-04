# 🛡️ Super Admin API — Frontend Build Spec (LLM-Friendly)

This document is written so that an LLM can generate the full Super Admin frontend (screens, routes, forms, types, API calls, and button visibility) using only this spec.

Backend source of truth (for alignment):
- `src/roles/superadmin/super-admin.controller.ts`
- `src/roles/superadmin/super-admin.service.ts`
- `src/products/products.service.ts`
- `src/orders/orders.service.ts`

---

## 1) Basics

**Base path:** `/super-admin/auth`

**Auth:** JWT bearer token

**Protected requests must include:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Error shape (NestJS default):**
```json
{
  "statusCode": 400,
  "message": "Some message",
  "error": "Bad Request"
}
```

### 1.1 Membership enforcement (important for UI)

For “manage storekeeper” and “manage delivery boy” routes, the backend verifies the target user is linked to the logged-in Super Admin.

If not linked:
- `400 Bad Request`
- message is one of:
  - `Storekeeper not linked to this super admin`
  - `Delivery boy not linked to this super admin`

Frontend behavior: treat this as “access denied” for that target user.

---

## 2) Frontend Screens (Minimum Complete App)

Build these routes/screens.

### 2.1 `/superadmin/signup`
- API: `POST /super-admin/auth/signup`
- Fields:
  - Required: `name`, `email`, `password`
  - Provide either:
    - `location` (string), OR
    - enough address fields for backend to derive `location`
  - `pincode` (optional) must be **6 digits** if provided
- Success: navigate to login

### 2.2 `/superadmin/login`
- API: `POST /super-admin/auth/login`
- Fields: `email`, `password`
- Success:
  - store `token`
  - navigate to dashboard

### 2.3 `/superadmin` (Dashboard)
Sidebar/tabs:
1) My Profile
2) Storekeepers
3) Delivery Partners

### 2.4 My Profile
- API: `GET /super-admin/auth/me`

### 2.5 Storekeepers
- List: `GET /super-admin/auth/storekeepers`
- Create: `POST /super-admin/auth/create-storekeeper`
- Detail: `GET /super-admin/auth/storekeepers/:userId`
- Workspace for a selected storekeeper (`storeId = userId`):
  - Products
  - Orders

### 2.6 Delivery Partners
- List: `GET /super-admin/auth/delivery-boys`
- Create: `POST /super-admin/auth/create-delivery-boy`
- Detail: `GET /super-admin/auth/delivery-boys/:userId`
- Workspace for a selected delivery partner (`deliveryBoyId = userId`):
  - Available jobs (READY)
  - My jobs
  - Job detail (accept/pickup/deliver/fail)

---

## 3) Data Models (TypeScript-friendly)

### 3.1 Enums
```ts
export type ManagedRole = "ADMIN" | "DELIVERY";
export type AccountStatus = "PENDING" | "ACTIVE" | "REJECTED";

export type DiscountType = "PERCENTAGE" | "FLAT";

export type OrderStatus =
  | "PLACED"
  | "READY"
  | "ACCEPTED"
  | "PICKED_UP"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  | "REJECTED"; // present in schema; not transitioned by storekeeper-ready route
```

### 3.2 Super Admin
```ts
export type SuperAdmin = {
  _id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN";
  location: string;
  mobileNumber?: string;
  state?: string;
  district?: string;
  taluk?: string;
  localBodyType?: string;
  localBodyName?: string;
  ward?: string;
  addressLine1?: string;
  pincode?: string;
  storekeepers: string[];
  deliveryBoys: string[];
  createdAt: string;
  updatedAt: string;
};
```

### 3.3 ManagedUser (storekeeper/delivery)
```ts
export type ManagedUser = {
  _id: string;
  name: string;
  email: string;
  role: ManagedRole;
  address: string;
  address2?: string;
  mobileNumber?: string;
  serviceablePincodes: string[];
  status: AccountStatus;
  isVerified: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};
```

### 3.4 Product
```ts
export type Offer = {
  type: DiscountType;
  value: number;
  startDate?: string; // ISO
  endDate?: string;   // ISO
  isActive: boolean;
};

export type Product = {
  _id: string;
  storeId: string;
  name: string;
  description?: string;
  images?: string[];
  quantity: number;
  price: string; // stored as string in backend
  category?: string;
  offers: Offer[];
  createdAt: string;
  updatedAt: string;
};
```

Validation note (important): backend uses `class-validator` `@IsNumber()` for `quantity` and offer `value`.
- Send JSON numbers (e.g. `50`), not strings (e.g. `"50"`).

### 3.5 Order
```ts
export type DeliveryAddress = {
  street: string;
  city: string;
  zipCode: string;
  phone: string;
  notes?: string;
};

export type OrderItem = {
  productId: Product | string; // populated in many reads
  quantity: number;
  price: number;
};

export type Order = {
  _id: string;
  checkoutId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  pickupAddress: string;
  deliveryAddress: DeliveryAddress;
  userId: { _id: string; name: string; email?: string; mobileNumber?: string } | string;
  storeId: { _id: string; name?: string; address?: string; mobileNumber?: string } | string;
  deliveryBoyId: { _id: string; name?: string; mobileNumber?: string } | string | null;
  createdAt: string;
  updatedAt: string;
};
```

---

## 4) Authentication APIs

### POST `/super-admin/auth/signup`

Request body (all fields optional except name/email/password; send either `location` or enough address fields):
```json
{
  "name": "Main Super Admin",
  "email": "admin@example.com",
  "password": "securepass",
  "location": "Kochi, Kerala",
  "mobileNumber": "9876553210",
  "state": "Kerala",
  "district": "Ernakulam",
  "taluk": "Kanayannur",
  "localBodyType": "CORPORATION",
  "localBodyName": "Kochi Corporation",
  "ward": "12",
  "addressLine1": "Kadavil Parambil House, Aroor",
  "pincode": "688534"
}
```

Success `201`:
```json
{
  "id": "<superAdminId>",
  "email": "admin@example.com",
  "role": "SUPER_ADMIN",
  "message": "Registered successfully"
}
```

Errors:
- `400` duplicate email (`Email already exists`)
- `400` validation errors (e.g., invalid email, password length, `pincode` not 6 digits)

### POST `/super-admin/auth/login`

Request body:
```json
{ "email": "admin@example.com", "password": "securepass" }
```

Success `200`:
```json
{
  "id": "<superAdminId>",
  "email": "admin@example.com",
  "role": "SUPER_ADMIN",
  "token": "<JWT_TOKEN>",
  "message": "Login successful"
}
```

Errors:
- `401` invalid credentials

---

## 5) Super Admin Profile

### GET `/super-admin/auth/me`

Success `200`: returns the Super Admin profile (no password).

---

## 6) Registry (Storekeepers & Delivery Partners)

### GET `/super-admin/auth/storekeepers`
Success `200`: `ManagedUser[]`

### GET `/super-admin/auth/storekeepers/:userId`
Success `200`: `ManagedUser`

### GET `/super-admin/auth/delivery-boys`
Success `200`: `ManagedUser[]`

### GET `/super-admin/auth/delivery-boys/:userId`
Success `200`: `ManagedUser`

---

## 7) Create Managed Users

These endpoints link the created user to the Super Admin automatically.

### POST `/super-admin/auth/create-storekeeper`

Request body:
```json
{
  "name": "Storekeeper One",
  "email": "store@example.com",
  "address": "123 Market St",
  "serviceablePincodes": ["560001", "560002"],
  "password": "storepass",
  "mobileNumber": "9999999999"
}
```

Success `201` (current backend behavior):
```json
{
  "id": "<userId>",
  "email": "store@example.com",
  "role": "ADMIN",
  "status": "ACTIVE",
  "message": "Registration successful. Awaiting admin approval."
}
```

Errors:
- `401` missing/invalid token
- `401` email already in use
- `400` validation errors

### POST `/super-admin/auth/create-delivery-boy`

Same request shape as create-storekeeper.

Success `201`:
```json
{
  "id": "<userId>",
  "email": "delivery@example.com",
  "role": "DELIVERY",
  "status": "ACTIVE",
  "message": "Registration successful. Awaiting admin approval."
}
```

---

## 8) Storekeeper Workspace APIs (Super Admin acting on a storekeeper)

All endpoints in this section require `storeId` to be linked to the logged-in Super Admin.

### 8.1 Products

#### GET `/super-admin/auth/storekeepers/:storeId/products`
Success `200`: `Product[]`

#### POST `/super-admin/auth/storekeepers/:storeId/products`
```json
{
  "name": "Apple",
  "description": "Fresh",
  "images": ["https://..."],
  "quantity": 50,
  "price": "₹100",
  "category": "Fruits"
}
```
Success `201`: `Product`

Errors:
- `400` validation errors (e.g. `quantity must be a number`)

#### GET `/super-admin/auth/storekeepers/:storeId/products/:id`
Success `200`: `Product`

Errors:
- `404` `Product not found`

#### PUT `/super-admin/auth/storekeepers/:storeId/products/:id`
All fields optional.

Errors:
- `404` `Product not found`

#### DELETE `/super-admin/auth/storekeepers/:storeId/products/:id`
Success `200`:
```json
{ "message": "Product deleted successfully" }
```

Errors:
- `404` `Product not found`

#### POST `/super-admin/auth/storekeepers/:storeId/products/:id/offer`
```json
{
  "type": "PERCENTAGE",
  "value": 10,
  "startDate": "2026-02-01T00:00:00.000Z",
  "endDate": "2026-02-28T23:59:59.000Z"
}
```

Errors:
- `400` validation errors (`type` not in `PERCENTAGE|FLAT`, `value must be a number`, invalid date strings)
- `404` `Product not found`

#### DELETE `/super-admin/auth/storekeepers/:storeId/products/:id/offer`
Deletes the first/only offer.

Errors:
- `404` `Product not found`
- `404` `No offers to delete`

#### PATCH `/super-admin/auth/storekeepers/:storeId/products/:id/stock`
```json
{ "quantity": 10 }
```

Errors:
- `400` validation errors (DTO expects `{ quantity: number }`)
- `404` `Product not found`

### 8.2 Orders

#### GET `/super-admin/auth/storekeepers/:storeId/orders?status=<STATUS>`
Optional query `status`.

Notes:
- Backend does not validate `status` here; unknown values will just return `[]`.

#### GET `/super-admin/auth/storekeepers/:storeId/orders/:id`

Errors:
- `404` `Order not found`

#### POST `/super-admin/auth/storekeepers/:storeId/orders/:id/ready`
Transitions: `PLACED` → `READY`.

Errors:
- `400` `Cannot transition from <CURRENT_STATUS> to READY`
- `404` `Order not found or cannot transition to READY`

#### GET `/super-admin/auth/storekeepers/:storeId/orders/:id/available-delivery`
Placeholder response:
```json
{
  "orderId": "<orderId>",
  "availableDeliveryBoys": [],
  "message": "Delivery boy list not yet configured"
}
```

---

## 9) Delivery Partner Workspace APIs (Super Admin acting on a delivery boy)

All endpoints in this section require `deliveryBoyId` to be linked to the logged-in Super Admin.

#### GET `/super-admin/auth/delivery-boys/:deliveryBoyId/orders?mine=true|status=READY`
Behavior:
- If `mine=true` → “my jobs”.
- Else if `status=READY` → “available jobs”.
- Else → `[]`.

Notes:
- “Available jobs” means `status=READY` AND `deliveryBoyId=null`.

#### GET `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/me`
Returns “my jobs”.

#### GET `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/:id`
Job detail (must be assigned to this delivery boy).

Errors:
- `404` `Order not found or not assigned to you`

#### POST `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/:id/accept`
Transitions: `READY` → `ACCEPTED` (assigns delivery boy).

Errors:
- `400` `Cannot transition from <CURRENT_STATUS> to ACCEPTED`
- `404` `Order not found or cannot transition to ACCEPTED`

#### POST `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/:id/pickup`
Transitions: `ACCEPTED` → `PICKED_UP`.

Errors:
- `400` `Order not assigned to you`
- `400` `Cannot transition from <CURRENT_STATUS> to PICKED_UP`
- `404` `Order not found or cannot transition to PICKED_UP`

#### POST `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/:id/deliver`
Transitions: `PICKED_UP` → `DELIVERED`.

Errors:
- `400` `Order not assigned to you`
- `400` `Cannot transition from <CURRENT_STATUS> to DELIVERED`
- `404` `Order not found or cannot transition to DELIVERED`

#### POST `/super-admin/auth/delivery-boys/:deliveryBoyId/orders/:id/fail`
Transitions: `PICKED_UP` → `FAILED`.

Errors:
- `400` `Order not assigned to you`
- `400` `Cannot transition from <CURRENT_STATUS> to FAILED`
- `404` `Order not found or cannot transition to FAILED`

---

## 10) Button Visibility Rules (make UI match backend state machine)

### Storekeeper workspace
- Show **Mark READY** only if `order.status === "PLACED"`.

### Delivery workspace
- In “Available jobs” list:
  - Show **Accept** only if `order.status === "READY"` and `order.deliveryBoyId === null`.
- In “My job” detail:
  - Show **Pickup** only if `order.status === "ACCEPTED"`.
  - Show **Deliver** and **Fail** only if `order.status === "PICKED_UP"`.

---

## 11) Common Failure Cases (UI Mapping)

- `401 Unauthorized`: token missing/expired → force logout and redirect to login.
- `400 ... not linked to this super admin`: show “You don’t have access to this account.”
- `400 Cannot transition from ...`: show “Action not allowed in current status.”

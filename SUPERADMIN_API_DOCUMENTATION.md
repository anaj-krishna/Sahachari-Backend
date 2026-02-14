# 🛡️ SUPERADMIN API DOCUMENTATION

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication (Super Admin)](#authentication-super-admin)
   - `POST /super-admin/auth/signup`
   - `POST /super-admin/auth/login`
3. [Super‑Admin Actions (protected)](#super-admin-actions-protected)
   - `POST /super-admin/auth/create-storekeeper`
   - `POST /super-admin/auth/create-delivery-boy`
4. [DTOs / Validation](#dtos--validation)
5. [Notes & Examples](#notes--examples)

---

## Overview
Endpoints under `super-admin/auth` are used by the super‑admin to manage top-level users (storekeepers & delivery personnel) and to authenticate as a Super Admin.

Base path: `/super-admin/auth`

---

## Authentication (Super Admin)

### POST /super-admin/auth/signup
- Purpose: Register a Super Admin (no auth required)
- Headers: `Content-Type: application/json`

Request body (example):
```json
{
  "name": "Sahachari Admin",
  "email": "admin@example.com",
  "password": "securepass",
  "location": "City, State"
}
```

Success response: `201 Created`
```json
{
  "id": "<superAdminId>",
  "email": "admin@example.com",
  "role": "SUPER_ADMIN",
  "location": "City, State",
  "message": "Super Admin registered successfully"
}
```
Errors:
- `400 Bad Request` — `Email already exists` (duplicate)

---

### POST /super-admin/auth/login
- Purpose: Login as Super Admin (returns JWT token)
- Headers: `Content-Type: application/json`

Request body (example):
```json
{
  "email": "admin@example.com",
  "password": "securepass"
}
```

Success response: `200 OK`
```json
{
  "id": "<superAdminId>",
  "email": "admin@example.com",
  "role": "SUPER_ADMIN",
  "location": "City, State",
  "token": "<JWT_TOKEN>",
  "message": "Login successful"
}
```
Errors:
- `401 Unauthorized` — `Invalid credentials`

---

## Super‑Admin Actions (protected)
All the endpoints below require a valid Super Admin JWT in the header:
```
Authorization: Bearer <JWT_TOKEN>  // token from /super-admin/auth/login
```

> Important: routes are protected by `JwtAuthGuard`. The JWT must belong to a Super Admin account.

### POST /super-admin/auth/create-storekeeper
- Purpose: Create a Storekeeper account and add its id to the SuperAdmin.storekeepers array
- Auth: required (Super Admin token)
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`

Request body (RegisterDto) — example:
```json
{
  "name": "Storekeeper One",
  "email": "store@example.com",
  "address": "123 Market St",
  "serviceablePincodes": ["560001", "560002"],
  "password": "storepass",
  "role": "ADMIN"
}
```
Note: the controller sets `role = ADMIN` server‑side; however `role` is required by the DTO validation, so include a valid enum value in the request.

Success response: `201 Created`
```json
{
  "id": "<userId>",
  "email": "store@example.com",
  "role": "ADMIN",
  "status": "PENDING",
  "message": "Registration successful. Awaiting admin approval."
}
```
Errors:
- `401 Unauthorized` — missing/invalid JWT
- `401 Unauthorized` — `Email already in use` (duplicate)
- `400 Bad Request` — validation errors (missing fields / bad formats)

### POST /super-admin/auth/create-delivery-boy
- Purpose: Create a Delivery Boy account and add its id to the SuperAdmin.deliveryBoys array
- Auth: required (Super Admin token)
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`

Request body (RegisterDto) — example:
```json
{
  "name": "Delivery One",
  "email": "delivery@example.com",
  "address": "45 Delivery Ave",
  "serviceablePincodes": ["560001"],
  "password": "deliverpass",
  "role": "DELIVERY"
}
```
Note: controller will set `role = DELIVERY` server‑side; include a valid `role` value to satisfy validation.

Success response: `201 Created`
```json
{
  "id": "<userId>",
  "email": "delivery@example.com",
  "role": "DELIVERY",
  "status": "PENDING",
  "message": "Registration successful. Awaiting admin approval."
}
```
Errors: same as `create-storekeeper` above.

### GET /super-admin/auth/me
- Purpose: Get the Super Admin's own profile
- Auth: required (Super Admin token)
- Headers: `Authorization: Bearer <token>`

Success response: `200 OK`
```json
{
  "id": "<superAdminId>",
  "name": "Main Super Admin",
  "email": "admin@example.com",
  "location": "Kochi, Kerala",
  "mobileNumber": "9876553210",
  "state": "Kerala",
  "district": "Ernakulam",
  "localBodyName": "Kochi Corporation",
  "pincode": "682001"
}
```

---

### GET /super-admin/auth/storekeepers
- Purpose: Return all `ADMIN` users created/owned by this Super Admin
- Auth: required (Super Admin token)
- Headers: `Authorization: Bearer <token>`

Success response: `200 OK` (array of users)
```json
[
  { "id": "<userId>", "name": "Storekeeper One", "email": "store@example.com", "role": "ADMIN" }
]
```

---

### GET /super-admin/auth/delivery-boys
- Purpose: Return all `DELIVERY` users created/owned by this Super Admin
- Auth: required (Super Admin token)
- Headers: `Authorization: Bearer <token>`

Success response: `200 OK` (array of users)
```json
[
  { "id": "<userId>", "name": "Delivery One", "email": "delivery@example.com", "role": "DELIVERY" }
]
```

---

## DTOs / Validation
- `SuperAdminSignupDto`
  - name: required string
  - email: required, valid email
  - password: minLength 6
  - location: required string

- `SuperAdminLoginDto`
  - email: required, valid email
  - password: required string

- `RegisterDto` (used when creating storekeeper/delivery)
  - name: string (required)
  - email: email (required)
  - address: string (required)
  - serviceablePincodes: non-empty array of strings (required)
  - password: string, minLength 6 (required)
  - role: one of [USER, DELIVERY, ADMIN, SUPERADMIN] (required by validator but overwritten server‑side)
  - address2?: optional string
  - mobileNumber?: optional string

---

## Notes & Examples
- Use the token returned by `POST /super-admin/auth/login` in `Authorization: Bearer <token>` for protected routes.
- Creating storekeeper/delivery will automatically push the created user's ID into the SuperAdmin document arrays (`storekeepers` / `deliveryBoys`).
- Error response shapes follow NestJS default: `{ statusCode: <code>, message: "<text>" }`.

cURL example — create storekeeper (replace <TOKEN>):
```bash
curl -X POST "http://localhost:3000/super-admin/auth/create-storekeeper" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Storekeeper One","email":"store@example.com","address":"123 Market St","serviceablePincodes":["560001"],"password":"storepass","role":"ADMIN"}'
```

---

If you want the same file in a different format (OpenAPI / Postman collection / .json) tell me which format and I will generate it. ✅

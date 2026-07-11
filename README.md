# Commerce Core API

A production-style RESTful backend API for an e-commerce system built with Node.js, Express.js, TypeScript, MongoDB, and Mongoose.

It covers the core backend flow of a real commerce system: authentication, product management, cart operations, order creation, stock validation, and order cancellation.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- JWT
- bcrypt

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Authenticated user profile
- Product CRUD operations
- Product search, filtering, and pagination
- Cart management
- Add, update, remove, and clear cart items
- Create orders from cart
- Stock validation during order creation
- Product stock decrease after order creation
- Stock restoration on order cancellation
- User-specific order history
- Centralized error handling
- Request validation with Zod
- Modular project architecture

## API Endpoints

### Health

```http
GET /api/v1/health
```

### Users

```http
POST /api/v1/users/register
POST /api/v1/users/login
GET  /api/v1/users/me
```

### Products

```http
POST   /api/v1/products
GET    /api/v1/products
GET    /api/v1/products/:productId
PATCH  /api/v1/products/:productId
DELETE /api/v1/products/:productId
```

Product listing supports search, filtering, and pagination:

```http
GET /api/v1/products?search=iphone&category=phones&minPrice=500&maxPrice=1000&page=1&limit=10
```

### Cart

```http
GET    /api/v1/cart
DELETE /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:productId
DELETE /api/v1/cart/items/:productId
```

### Orders

```http
POST  /api/v1/orders
GET   /api/v1/orders
GET   /api/v1/orders/:orderId
PATCH /api/v1/orders/:orderId/cancel
```

## Authentication

Protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer ACCESS_TOKEN
```

The access token is returned after a successful login.

## Product Query Parameters

The product listing endpoint supports search, filtering, and pagination.

Example request:

```http
GET /api/v1/products?search=iphone&category=phones&page=1&limit=10
```

Supported query parameters:

```txt
search     Search by product name or description
category   Filter products by category
minPrice   Filter products by minimum price
maxPrice   Filter products by maximum price
page       Select the page number
limit      Set the number of products per page
```

## Order Flow

When an order is created from the cart:

1. Cart items are loaded with their product details.
2. Product existence and stock availability are validated.
3. Order items are stored as snapshots.
4. The order is created with pending status.
5. Product stock is decreased.
6. The cart is cleared.

Only orders with `pending` status can be cancelled. When cancelled, the ordered quantities are restored to product stock.

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/commerce-core-api
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your-super-secure-access-token-secret-key
JWT_ACCESS_EXPIRES_IN=15m
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Project Structure

```txt
src/
├── config/
│   ├── database.ts
│   └── env.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error-handler.middleware.ts
│   ├── not-found.middleware.ts
│   └── validate-resource.middleware.ts
├── modules/
│   ├── cart/
│   ├── order/
│   ├── product/
│   └── user/
├── routes/
│   ├── health.routes.ts
│   └── index.ts
├── utils/
│   ├── app-error.ts
│   ├── async-handler.ts
│   └── jwt.ts
├── app.ts
└── server.ts
```

## Error Handling

The API uses a centralized error handling middleware and a custom AppError class for operational errors.

Example error response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

## What This Project Demonstrates

This project was built to demonstrate practical backend development concepts, including:

- Clean REST API design
- Authentication with JWT
- Protected routes
- Modular project architecture
- Request validation with Zod
- Centralized error handling
- MongoDB relationships with Mongoose
- Cart and order business logic
- Product stock management
- TypeScript backend development

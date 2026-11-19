# E-Commerce REST API

A RESTful API for a simple online store, built with **Node.js**, **Express** and **MongoDB (Mongoose)**.
Built during the Node.js back-end training at ITI (Information Technology Institute), Smart Village branch.

## Features

- **Products**: create, read (with pagination), update and delete products
- **Authentication**: register and login with **bcrypt** password hashing and **JWT** tokens
- **Wishlist**: logged-in users can add, view and remove products from their wishlist
- **Cart**: every logged-in user has their own cart: add, update quantity, remove items and clear the cart. Totals are recalculated automatically from current prices, and quantities can't exceed the product's stock
- **Validation**: request validation with **Joi** and schema validation with Mongoose
- **Clean structure**: `models / controllers / routes / middleware / validators`

## Tech Stack

Node.js, Express 5, MongoDB, Mongoose, Joi, JWT (jsonwebtoken), bcrypt, dotenv

## Getting Started

**Requirements:** Node.js and a MongoDB server running on `localhost:27017`.

```bash
# 1. install dependencies
npm install

# 2. create your .env file from the example, then set your own secret
cp .env.example .env

# 3. (optional) load sample products from seed-products.json into the "products" collection

# 4. run the server (http://localhost:4000)
npm run dev
```

The database name is `nodeMongoDB` (see `db.js`).

## API Endpoints

### Products

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/products?page=1&limit=10` | List products with pagination |
| GET | `/products/:id` | Get one product |
| POST | `/products` | Create a product (Joi validated) |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

### User

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/user/register` | Create an account |
| POST | `/user/login` | Login and receive a JWT (valid for 1 hour) |

### Wishlist (requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/wishlist` | View my wishlist |
| POST | `/wishlist/:productId` | Add a product to my wishlist |
| DELETE | `/wishlist/:productId` | Remove a product from my wishlist |

### Cart (requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/cart` | View my cart |
| POST | `/cart/add` | Add a product. Body: `{ "productId": "...", "quantity": 1 }` |
| PUT | `/cart/:productId` | Change the quantity of an item. Body: `{ "quantity": 3 }` |
| DELETE | `/cart/:productId` | Remove an item from my cart |
| DELETE | `/cart` | Empty my cart |

## Author

**Aya Hesham Azmy**: [GitHub](https://github.com/Ayahesham5) · [LinkedIn](https://www.linkedin.com/in/aya-hesham-a12423373)

import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";
import {
  cartMiddleware,
  updateCartItemMiddleware,
} from "../middleware/cart.middleware.js";
import auth from "../middleware/auth.middleware.js";
let router = express.Router();

// every cart route needs a logged in user (auth middleware)

// GET ,/cart ===>my cart
router.get("/", auth, getCart);

// POST ,/cart/add ===>add to cart
router.post("/add", auth, cartMiddleware, addToCart);

// PUT ,/cart/:productId ===>change the quantity of an item
router.put("/:productId", auth, updateCartItemMiddleware, updateCartItem);

// DELETE ,/cart/:productId ===>remove an item from the cart
router.delete("/:productId", auth, removeFromCart);

// DELETE ,/cart ===>empty the cart
router.delete("/", auth, clearCart);

export default router;

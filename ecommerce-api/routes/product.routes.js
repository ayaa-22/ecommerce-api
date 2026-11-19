import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getById,
  updateProduct,
} from "../controllers/products.controller.js";
import { productMiddleware } from "../middleware/product.middleware.js";
let router = express.Router();

// GET ,/products ===>products
router.get("/", getAllProducts);

// GET ,/products/:id ===>product by id
router.get("/:id", getById);

router.post("/", productMiddleware, createProduct);

router.delete("/:id", deleteProduct);

// PUT ,/products/:id ===>update product
router.put("/:id", updateProduct);

export default router;

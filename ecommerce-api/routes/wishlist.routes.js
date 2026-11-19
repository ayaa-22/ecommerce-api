import express from "express";
import {
  addtOwhisList,
  getWishlistdetails,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";
import auth from "../middleware/auth.middleware.js";

let router = express.Router();

router.post("/:productId", auth, addtOwhisList);
router.get("/", auth, getWishlistdetails);

// Lab: DELETE ,/wishlist/:productId ===>remove from wishlist
router.delete("/:productId", auth, removeFromWishlist);

export default router;

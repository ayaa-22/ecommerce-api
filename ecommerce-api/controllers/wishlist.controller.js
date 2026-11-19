import mongoose from "mongoose";
import ProductModel from "../models/product.js";
import UserModel from "../models/user.js";

export const addtOwhisList = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Founded!",
      });
    }
    const user = await UserModel.findById(req.userId);
    if (user.whishlist.some((id) => id.equals(product._id))) {
      return res.status(409).json({
        message: "Product Already Exists!",
      });
    }
    user.whishlist.push(product._id);
    await user.save();
    res.status(200).json({
      message: "Product Added Successfully to your wishlist",
      whishlist: user.whishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWishlistdetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
      .select("name email whishlist")
      .populate("whishlist", "name brand category price");
    res.status(200).json({
      whishlist: user.whishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lab: api==>remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // 1. the id must be a valid ObjectId
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // 2. the logged in user (req.userId comes from the auth middleware)
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Founded!" });
    }

    // 3. the product must be inside this user's wishlist
    //    (we don't check the Product collection: the product may be deleted
    //     from the store but the user should still be able to remove it)
    if (!user.whishlist.some((id) => id.equals(productId))) {
      return res.status(404).json({
        message: "Product Not Found In Your Wishlist!",
      });
    }

    // 4. remove it and save
    user.whishlist.pull(productId);
    await user.save();

    res.status(200).json({
      message: "Product Removed Successfully from your wishlist",
      whishlist: user.whishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

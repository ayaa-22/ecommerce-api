import mongoose from "mongoose";
import CartModel from "../models/cart.js";
import ProductModel from "../models/product.js";

// Recalculate the cart totals from the products' CURRENT prices.
// This is safer than adding/subtracting step by step, because it can never
// drift if a price changes or a product is deleted from the store.
const recalculate = async (cart) => {
  const ids = cart.productList.map((item) => item.product);
  const products = await ProductModel.find({ _id: { $in: ids } }).select(
    "price",
  );
  const prices = new Map(products.map((prod) => [prod._id.toString(), prod.price]));

  // drop items whose product was deleted from the store
  cart.productList
    .filter((item) => !prices.has(item.product.toString()))
    .forEach((item) => cart.productList.pull(item._id));

  cart.quantity = cart.productList.reduce((sum, item) => sum + item.quantity, 0);
  cart.total = cart.productList.reduce(
    (sum, item) => sum + prices.get(item.product.toString()) * item.quantity,
    0,
  );
};

// POST ,/cart/add ,{productId, quantity} ===>add product to MY cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = req.body.quantity || 1;

    // 1. the product must exist
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Founded!" });
    }

    // 2. the logged in user's cart (req.userId comes from the auth middleware)
    //    get it, or create it the first time
    let cart = await CartModel.findOne({ user: req.userId });
    if (!cart) {
      cart = new CartModel({ user: req.userId });
    }

    // 3. same product again ===> increase its quantity, else add a new item
    const item = cart.productList.find(
      (prod) => prod.product.toString() == productId,
    );
    const newQuantity = (item ? item.quantity : 0) + quantity;

    // can't order more than what we have in stock
    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} in stock`,
      });
    }

    if (item) {
      item.quantity = newQuantity;
    } else {
      cart.productList.push({ product: productId, quantity: quantity });
    }

    // 4. update the cart totals, then save (save() runs the mongoose validation)
    await recalculate(cart);
    await cart.save();
    await cart.populate("productList.product");

    res
      .status(200)
      .json({ success: true, message: "Added To Cart Successfully", cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ,/cart ===>show MY cart
export const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.userId }).populate(
      "productList.product",
    );
    if (!cart) {
      return res.status(200).json({ quantity: 0, total: 0, productList: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT ,/cart/:productId ,{quantity} ===>set the quantity of one item
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const cart = await CartModel.findOne({ user: req.userId });
    const item = cart?.productList.find(
      (prod) => prod.product.toString() == productId,
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found In Your Cart!" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Founded!" });
    }
    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} in stock`,
      });
    }

    item.quantity = quantity;
    await recalculate(cart);
    await cart.save();
    await cart.populate("productList.product");

    res
      .status(200)
      .json({ success: true, message: "Cart Updated Successfully", cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE ,/cart/:productId ===>remove one item from the cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const cart = await CartModel.findOne({ user: req.userId });
    // we don't check the Product collection: the product may be deleted from
    // the store but the user should still be able to remove it from the cart
    const item = cart?.productList.find(
      (prod) => prod.product.toString() == productId,
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found In Your Cart!" });
    }

    cart.productList.pull(item._id);
    await recalculate(cart);
    await cart.save();
    await cart.populate("productList.product");

    res
      .status(200)
      .json({ success: true, message: "Removed From Cart Successfully", cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE ,/cart ===>empty my cart
export const clearCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.userId });
    if (cart) {
      cart.productList = [];
      cart.quantity = 0;
      cart.total = 0;
      await cart.save();
    }
    res
      .status(200)
      .json({ success: true, message: "Cart Cleared Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

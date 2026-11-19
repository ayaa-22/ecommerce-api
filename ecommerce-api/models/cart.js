import mongoose from "mongoose";

// Cart ===> { quantity, total, productList: [] }
let cartSchema = mongoose.Schema({
  // every user has exactly one cart
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    unique: true,
  },
  // total number of items in the cart
  quantity: {
    type: Number,
    min: [0, "Quantity can not be negative"],
    default: 0,
  },
  // total price of everything in the cart
  total: {
    type: Number,
    min: [0, "Total can not be negative"],
    default: 0,
  },
  productList: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
      quantity: {
        type: Number,
        min: [1, "Quantity at least 1"],
        required: [true, "Quantity is required"],
      },
    },
  ],
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;

import mongoose from "mongoose";

let productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name at least 2 char"],
    maxLength: [100, "maximum name length is 100"],
    trim: true,
    required: [true, "Name is required"],
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Mobile", "Laptop", "Accessories", "Wearables", "Tablet"],
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  stock: {
    type: Number,
    min: 1,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    required: true,
  },
  colors: [String],
  supplier: {
    name: String,
    city: String,
  },
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;

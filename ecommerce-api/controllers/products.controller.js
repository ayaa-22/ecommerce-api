import ProductModel from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    let products = await ProductModel.find().skip(skip).limit(limit);
    let totalProducts = await ProductModel.countDocuments();

    let totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      page,
      limit,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Founded" });
    }
    res.status(200).json({ success: true, product: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};
export const createProduct = async (req, res) => {
  try {
    let product = await ProductModel.create(req.body);
    res
      .status(201)
      .json({ message: "Product Created Successfully", product: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "No Product Founded!" });
    }

    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

// Update product API
export const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    // new:true  ===> return the product AFTER the update
    // runValidators:true ===> check the new data against the schema types
    let product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Founded!" });
    }
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

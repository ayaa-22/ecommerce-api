import { productJoiValidation } from "../validators/product.validator.js";

export const productMiddleware = (req, res, next) => {
  const { error } = productJoiValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

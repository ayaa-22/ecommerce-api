import {
  addToCartJoiValidation,
  updateCartItemJoiValidation,
} from "../validators/cart.validator.js";

export const cartMiddleware = (req, res, next) => {
  // req.body can be undefined if no JSON was sent
  const { error } = addToCartJoiValidation.validate(req.body || {});
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

export const updateCartItemMiddleware = (req, res, next) => {
  const { error } = updateCartItemJoiValidation.validate(req.body || {});
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

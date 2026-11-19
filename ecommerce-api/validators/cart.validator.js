import Joi from "joi";

// body of POST /cart/add  ===> { productId, quantity }
export const addToCartJoiValidation = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).default(1),
});

// body of PUT /cart/:productId  ===> { quantity }
export const updateCartItemJoiValidation = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

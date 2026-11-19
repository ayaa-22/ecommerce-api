import Joi from "joi";

export const productJoiValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  brand: Joi.string().required(),
  category: Joi.string().valid(
    "Mobile",
    "Laptop",
    "Accessories",
    "Wearables",
    "Tablet",
  ),
  price: Joi.number().min(1).required(),
  stock: Joi.number().min(1).required(),
  rating: Joi.number().min(1).required(),
  colors: Joi.array().items(Joi.string()),
  supplier: Joi.object({
    name: Joi.string(),
    city: Joi.string(),
  }),
});

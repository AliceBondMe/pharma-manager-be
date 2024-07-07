import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  suppliers: Joi.string().min(3).max(50).required(),
  stock: Joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "Stock must be a string containing only digits.",
  }),
  price: Joi.string()
    .pattern(/^\d+\.\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Price must be a string in the format of digits followed by a dot and two digits after it.",
      "any.required": "Price is required",
    }),
  category: Joi.string().min(3).max(50).required(),
  brand: Joi.string().min(3).max(50).required(),
  photo: Joi.string(),
});

export const productEditSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  suppliers: Joi.string().min(3).max(50),
  stock: Joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "Stock must be a string containing only digits.",
  }),
  price: Joi.string()
    .pattern(/^\d+\.\d{2}$/)
    .messages({
      "string.pattern.base":
        "Price must be a string in the format of digits followed by a dot and two digits after it.",
    }),
  category: Joi.string().min(3).max(50),
  brand: Joi.string().min(3).max(50),
  photo: Joi.string(),
});

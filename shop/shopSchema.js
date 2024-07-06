import Joi from "joi";

export const shopSchema = Joi.object({
  shopName: Joi.string().min(3).max(100).required(),
  shopOwnerName: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{6,12}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 6 and 12 digits",
    }),
  address: Joi.string()
    .min(6)
    .max(100)
    .pattern(/^[a-zA-Z0-9\s,'-]*$/)
    .required()
    .messages({
      "string.pattern.base":
        "Address can only contain letters, numbers, spaces, commas, apostrophes, and hyphens",
    }),
  city: Joi.string().min(2).max(50).required(),
  postal: Joi.string()
    .pattern(/^[A-Za-z0-9\s-]{3,10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Postal code must be between 3 and 10 characters and can only contain letters, numbers, spaces, and hyphens",
    }),
  hasDeliverySystem: Joi.boolean().required(),
});

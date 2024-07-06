import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
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
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,20}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,20}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

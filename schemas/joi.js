const Joi = require("joi");

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/)
    .required(),
  phone: Joi.string().min(5).required(),
});

module.exports = contactJoiSchema;

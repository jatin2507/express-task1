const Joi = require("joi");

// Define the schema for validation
const JoiSchema = Joi.object({
  name: Joi.string(),
  sort: Joi.number().integer().min(0).max(99),
  userId: Joi.string().length(4),
});

module.exports = JoiSchema;

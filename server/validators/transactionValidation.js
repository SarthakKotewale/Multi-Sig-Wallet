const Joi = require("@hapi/joi");

const transactionValidation = (data) => {
  const schema = Joi.object({
    wallet: Joi.string().hex().length(24).required(), // Assuming wallet ID is a 24-character hex string (MongoDB ObjectId)
    description: Joi.string().min(3).required(),
    amount: Joi.number().min(0).required(),
    recipient: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

module.exports = {
  transactionValidation,
};

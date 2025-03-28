const Joi = require("joi");

const walletValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    owners: Joi.array().items(Joi.string().hex().length(24)).min(1).required(), //24 char object id
    threshold: Joi.number().integer().min(1).required(),
  });
  return schema.validate(data);
};

module.exports = {
  walletValidation,
};

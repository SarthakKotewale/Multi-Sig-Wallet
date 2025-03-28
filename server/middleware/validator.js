const validator = (schema) => async (req, res, next) => {
  const { error } = schema(req.body);
  if (error) {
    return res
      .status(400)
      .json({ errors: [{ msg: error.details[0].message }] });
  }
  next();
};

module.exports = validator;

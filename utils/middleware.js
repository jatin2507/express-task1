const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.json({ error: true, data: error.message || "", code: 500, message: "Validation Error!" });
    } else {
      req.body = value;
      next();
    }
  };
};

module.exports = validateBody;

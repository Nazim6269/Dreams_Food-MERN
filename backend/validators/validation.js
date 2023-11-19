const { validationResult } = require("express-validator");
const { errorResponse } = require("../helpers/responseHandler");

const runValidation = (req, res, next) => {
  console.log("2");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      });
      return;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { runValidation };

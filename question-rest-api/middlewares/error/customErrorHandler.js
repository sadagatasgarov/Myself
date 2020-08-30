const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  // console.log(err.name);
  console.log(err);
  if (err.name === "SyntaxError") {
    customError = new CustomError("Unxpected Syntax2", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if (err.code === 11000){
    customError = new CustomError("Dublicate error: check your input", 400);
  }
  //console.log(customError.message, customError.status);

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

module.exports = customErrorHandler;

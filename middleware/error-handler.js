const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'some thing went wrong'
  };
  // handler error from mongoose method
  if (err.name === 'CastError') {
    customError.statusCode = 404;
    customError.msg = `No item found with id: ${err.value}`;
  }
  return res.status(customError.statusCode).json({ err: err, msg: customError.msg })
};

module.exports = errorHandlerMiddleware;
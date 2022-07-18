const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'some thing went wrong'
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
};

module.exports = errorHandlerMiddleware;
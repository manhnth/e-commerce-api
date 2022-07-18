const CustomError = require('../errors');

const authorizedUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnAuthenticatedError('Authentication ')
  }
}
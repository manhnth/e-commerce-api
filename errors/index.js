const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnAuthorizedError = require('./unauthorized');
const UnAuthenticatedError = require('./unauthenticated');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
  UnAuthenticatedError
};
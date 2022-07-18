const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnAuthorized = require('./unauthorized');
const UnAuthenticated = require('./unauthenticated');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthorized,
  UnAuthenticated
};
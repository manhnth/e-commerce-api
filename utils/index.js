const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse
} = require('./jwt');
const createPayload = require('./createPayload');
const checkPermissions = require('./checkPermissions')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createPayload,
  checkPermissions
};
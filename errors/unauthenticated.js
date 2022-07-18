const CustomAPIError = require('./custom-api-error');
const { StatusCodes } = require('http-status-codes');

<<<<<<< HEAD
class UnAuthenticatedError extends CustomAPIError {
=======
class UnAuthenticated extends CustomAPIError {
>>>>>>> 82f7f7a40e8a18d49aed15f066efd65959e76ca2
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
};

<<<<<<< HEAD
module.exports = UnAuthenticatedError;
=======
module.exports = UnAuthenticated;
>>>>>>> 82f7f7a40e8a18d49aed15f066efd65959e76ca2

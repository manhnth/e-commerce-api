const CustomAPIError = require('./custom-api-error');
const { StatusCodes } = require('http-status-codes');

<<<<<<< HEAD
class UnAuthorizedError extends CustomAPIError {
=======
class UnAuthorized extends CustomAPIError {
>>>>>>> 82f7f7a40e8a18d49aed15f066efd65959e76ca2
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
};

<<<<<<< HEAD
module.exports = UnAuthorizedError;
=======
module.exports = UnAuthorized;
>>>>>>> 82f7f7a40e8a18d49aed15f066efd65959e76ca2

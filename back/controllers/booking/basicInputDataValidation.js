'use strict';

/**
 * Verifies if some data exists
 *
 * @param {Object} req
 * @return {Boolean} 
 */
function basicInputDataValidation(req) {
  if (!req.auth.id) {
    const error = new Error();
    error.details = 'User ID is required';
    error.code = 403;
    throw error;
  }
  if (!req.body.price) {
    const error = new Error();
    error.code = 400;
    error.details = 'Invalid Flight Data';
    throw error;
  }
  return true;
}
exports.basicInputDataValidation = basicInputDataValidation;

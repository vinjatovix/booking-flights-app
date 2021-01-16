'use strict';
/**
 * Validates the existence of an user in User Login
 *
 * @param {Array} user
 */
function validateUser(user) {
  if (!user || user.length === 0) {
    const error = new Error();
    error.code = 401;
    error.details = 'Invalid credentials, please try again';
    throw error;
  }
  return true;
}
module.exports = { validateUser };

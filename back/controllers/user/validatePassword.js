'use strict';
const bcrypt = require('bcryptjs');

/**
 * Validates user password to access system
 *
 * @param {String} password "User inpu Info"
 * @param {Array} user "Database Info"
 */
async function validatePassword(password, user) {
  const valid = await bcrypt.compare(password, user.Usr_password);
  if (!valid) {
    const error = new Error();
    error.ok = false;
    error.code = 401;
    error.details = 'Invalid credentials, please try again';
    throw error;
  }
  return true;
}
module.exports = { validatePassword };

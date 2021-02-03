'use strict';

const bcrypt = require('bcryptjs');

/**
 * Validates user password to access system
 *
 * @param {String} password "User input Info"
 * @param {Array} user "Database Info"
 */
async function validatePassword(password, user) {
  const valid = await bcrypt.compare(password, user.Usr_password);
  if (!valid) {
    const err = new Error();
    err.code = 401;
    err.details = 'Credenciales inválidos, prueba de nuevo.';
    throw err;
  }
  return true;
}
module.exports = { validatePassword };

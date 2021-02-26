'use strict';
/**
 * Validates the existence of an user in User Login
 *
 * @param {Array} user
 */
function validateUser(user) {
  if (!user || user.length === 0) {
    const err = new Error();
    err.code = 401;
    err.details = 'Credenciales inválidos, prueba de nuevo';
    throw err;
  }
  return true;
}
module.exports = { validateUser };

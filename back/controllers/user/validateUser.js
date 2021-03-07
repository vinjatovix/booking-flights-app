'use strict';

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

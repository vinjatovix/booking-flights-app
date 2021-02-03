'use strict';

const path = require('path');
const userRepository = require('../../repositories/user/user-repository');

/**
 * Manages the user status on login
 *
 * @param {*} user
 * @return {*}
 */
async function userStatusManager(user) {
  if (!['a', 'i', 'e'].includes(user.Usr_status)) {
    const err = new Error();
    err.code = 418;
    err.details = 'Hmmm esto no es normal, quién eres?';
    err.file = path.basename(__filename);
    throw err;
  }
  if (user.Usr_status === 'i') {
    await userRepository.changeStatus(['a', user.Usr_ID]);
  } else if (user.Usr_status === 'e') {
    const err = new Error();
    err.code = 403;
    err.details = 'Credenciales inválidos, esta cuenta ha sido eliminada.';
    throw err;
  }
  return true;
}
module.exports = { userStatusManager };

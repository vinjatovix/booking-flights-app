'use strict';

const path = require('path');
const userRepository = require('../../repositories/user-repository');

/**
 * Manages the user status on login
 *
 * @param {*} user
 * @return {*}
 */
async function userStatusManager(user) {
  if (!['a', 'i', 'e'].includes(user.Usr_status)) {
    const error = new Error();
    error.code = 418;
    error.details = 'Hmmm esto no es normal, quién eres?';
    error.file = path.basename(__filename);
    throw error;
  }
  if (user.Usr_status === 'i') {
    await userRepository.changeStatus(['a', user.Usr_ID]);
  } else if (user.Usr_status === 'e') {
    const error = new Error();
    error.code = 403;
    error.details = 'Credenciales inválidos, esta cuenta ha sido eliminada.';
    throw error;
  }
  return true;
}
module.exports = { userStatusManager };

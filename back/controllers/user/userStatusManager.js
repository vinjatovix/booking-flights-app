'use strict';
const userRepository = require('../../repositories/user-repository');
const path = require('path');

/**
 * Manages the user status on login
 *
 * @param {*} user
 * @return {*}
 */
async function userStatusManager(user) {
  if (!['a', 'i', 'e'].includes(user.Usr_status)) {
    const error = new Error();
    error.ok = false;
    error.code = 418;
    error.details = 'Who are you?';
    error.file = path.basename(__filename);
    throw error;
  }
  if (user.Usr_status === 'i') {
    await userRepository.changeStatus(['a', user.Usr_ID]);
  } else if (user.Usr_status === 'e') {
    const error = new Error();
    error.ok = false;
    error.code = 403;
    error.details = 'Invalid credentials, this account has been deleted';
    throw error;
  }
  return true;
}
module.exports = { userStatusManager };

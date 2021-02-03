'use strict';

const { deleteFile, fileExists } = require('../utils/utils-controller');

/**
 * Deletes the old avatar picture from the system
 *
 * @param {String} oldPath
 * @param {*} next
 * @return {Boolean}
 */
async function deleteOldAvatar(oldPath, next) {
  if ((await fileExists(oldPath)) && !(await deleteFile(oldPath))) {
    const error = new Error();
    error.ok = false;
    error.code = 500;
    error.details = 'Ha ocurrido algo raro en el proceso, Se puede haber perdido la foto';
    next(error);
  }
  return true;
}
module.exports = { deleteOldAvatar };

'use strict';

const { deleteFile, fileExists } = require('../utils/utils-controller');

async function deleteOldAvatar(oldPath, next) {
  if ((await fileExists(oldPath)) && !(await deleteFile(oldPath))) {
    const err = new Error();
    err.ok = false;
    err.details = 'Ha ocurrido algo raro en el proceso, Se puede haber perdido la foto';
    next(err);
  }
  return true;
}
module.exports = { deleteOldAvatar };

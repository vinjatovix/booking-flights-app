'use strict';
const { fileExists, deleteFile } = require('./utils');


async function deleteOldAvatar(oldPath, next) {
  if ((await fileExists(oldPath)) && !(await deleteFile(oldPath))) {
    const error = new Error();
    error.ok = false;
    error.code = 500;
    error.details = 'Something weird happened, data may be lost, please try again';
    next(error);
  }
}
exports.deleteOldAvatar = deleteOldAvatar;

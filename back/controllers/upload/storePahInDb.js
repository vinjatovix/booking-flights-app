'use strict';

const { storeAvatar } = require('../../repositories/user/user-repository');

/**
 * Stores the new path to the file in db
 *
 * @param {string} fileName
 * @param {number} id
 * @return {Boolean}
 */
async function storePathInDb(fileName, id) {
  const storePathInDb = await storeAvatar([fileName, id]);
  if (!storePathInDb) {
    const err = new Error();
    err.details =
      'Ha ocurrido algo raro escribiendo en la base de datos, se pueden haber perdido estos últimos datos. por favor, repite el proceso.';
    throw err;
  }
  return true;
}

module.exports = { storePathInDb };

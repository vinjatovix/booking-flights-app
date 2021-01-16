'use strict';

const userRepository = require('../../repositories/user-repository');

/**
 * Stores the new path to the file in db
 *
 * @param {string} fileName
 * @param {number} id
 * @return {Boolean}
 */
async function storePathInDb(fileName, id) {
  const storePathInDb = await userRepository.storeAvatar([fileName, id]);
  if (!storePathInDb) {
    const error = new Error();
    error.details = 'Something weird happened writting in DB, data may be lost. Please try again';
    throw error;
  }
  return true;
}

module.exports = { storePathInDb };

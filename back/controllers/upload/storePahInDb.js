'use strict';

const userRepository = require('../../repositories/user-repository');

async function storePathInDb(fileName, id) {
  const storePathInDb = await userRepository.storeAvatar([fileName, id]);
  if (!storePathInDb) {
    const error = new Error('Something weird happened writting in DB, data may be lost. Please try again');
    error.code = 500;
    throw error;
  }
}

module.exports = { storePathInDb };

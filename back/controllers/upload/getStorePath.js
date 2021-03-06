'use strict';

const { fileExists } = require('../utils/utils-controller');
const fs = require('fs').promises;
const path = require('path');

async function getStorePath() {
  const storePath = path.join(__dirname, '/../../assets/avatars/');
  if (!(await fileExists(storePath))) {
    await fs.mkdir(storePath, {
      recursive: true,
    });
  }
  return storePath;
}

module.exports = { getStorePath };

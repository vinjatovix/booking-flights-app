'use strict';

const { createFileChunk } = require('./createFileChunk');
const { deleteFile } = require('./deleteFile');
const { fileExists } = require('./fileExists');
const { validateExtension } = require('./validateExtension');
const { validateReturn } = require('./validateReturn');
const { wait } = require('./wait');

module.exports = {
  createFileChunk,
  deleteFile,
  fileExists,
  validateExtension,
  validateReturn,
  wait,
};

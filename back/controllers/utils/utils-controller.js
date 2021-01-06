('use strict');

const { wait } = require('./wait');
const { validateReturn } = require('./validateReturn');
const { fileExists } = require('./fileExists');
const { createFileChunk } = require('./createFileChunk');
const { validateExtension } = require('./validateExtension');
const { fileMaxSize } = require('./fileMaxSize');
const { fileMinSize } = require('./fileMinSize');
const { deleteFile } = require('./deleteFile');

module.exports = {
  wait,
  validateReturn,
  fileExists,
  createFileChunk,
  validateExtension,
  fileMaxSize,
  fileMinSize,
  deleteFile,
};

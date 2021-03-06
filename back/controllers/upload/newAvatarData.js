'use strict';
const path = require('path');

function newAvatarData(file, id) {
  let extension = file.name.split('.');
  extension = extension[extension.length - 1].toLowerCase();
  const fileName = `${id}-${Date.now()}.${extension}`;
  const uploadPath = path.join(__dirname, '/../../assets/avatars/', fileName);
  return { uploadPath, fileName };
}

module.exports = { newAvatarData };

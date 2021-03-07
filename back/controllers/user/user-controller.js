'use strict';

const { deleteAccount } = require('./deleteAccount');
const { getImage } = require('./getImage');
const { getUpdateData, postUpdateData } = require('./updateData');
const { getUpdatePass } = require('./getUpdatePass');
const { googleLogin } = require('../google/googleLogin');
const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { postUpdatePass } = require('./updatePassword');
const { sendEmail } = require('./sendEmail');
const { verifyToken } = require('./verifyToken');

module.exports = {
  deleteAccount,
  getImage,
  getUpdateData,
  getUpdatePass,
  googleLogin,
  postLogIn,
  postUpdateData,
  postSignIn,
  postUpdatePass,
  sendEmail,
  verifyToken,
};

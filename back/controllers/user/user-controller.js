'use strict';

const { deleteAccount } = require('./deleteAccount');
const { getUpdateData, postUpdateData } = require('./updateData');
const { postUpdatePass } = require('./updatePassword');
const { getUpdatePass } = require('./getUpdatePass');
const { googleLogin } = require('../google/googleLogin');
const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { sendEmail } = require('./sendEmail');
const { verifyToken } = require('./verifyToken');

module.exports = {
  deleteAccount,
  getUpdateData,
  getUpdatePass,
  googleLogin,
  postLogIn,
  postUpdateData,
  postUpdatePass,
  postSignIn,
  sendEmail,
  verifyToken,
};

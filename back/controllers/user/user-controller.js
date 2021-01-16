'use strict';

const { deleteAccount } = require('./deleteAccount');
const { getUpdateData, postUpdateData } = require('./updateData');
const { getUpdatePass, postUpdatePass } = require('./updatePassword');
const { googleLogin } = require('../google/googleLogin');
const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { sendEmail } = require('./sendEmail');

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
};

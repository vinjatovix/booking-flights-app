'use strict';

const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { getUpdateData, postUpdateData } = require('./updateData');
const { getUpdatePass, postUpdatePass } = require('./updatePassword');
const { deleteAccount } = require('./deleteAccount');

module.exports = { postLogIn, postSignIn, getUpdateData, postUpdateData, getUpdatePass, postUpdatePass, deleteAccount };

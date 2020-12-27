'use strict';

const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { getUpdateData, postUpdateData } = require('./updateData');

module.exports = { postLogIn, postSignIn, getUpdateData, postUpdateData };

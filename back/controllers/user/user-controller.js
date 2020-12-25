'use strict';

const { postLogIn } = require('./postLogIn');
const { postSignIn } = require('./postSignIn');
const { googleLogin } = require('./googleLogin');

module.exports = { postLogIn, postSignIn, googleLogin };

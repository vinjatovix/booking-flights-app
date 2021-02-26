'use strict';

const { changeStatus } = require('./changeStatus');
const { createUser } = require('./createUser');
const { getAvatar } = require('./getAvatar');
const { getUserByEmail } = require('./getUserByEmail');
const { updateData } = require('./updateData');
const { updatePass } = require('./updatePass');
const { storeAvatar } = require('./storeAvatar');

module.exports = { changeStatus, createUser, getAvatar, getUserByEmail, updateData, updatePass, storeAvatar };

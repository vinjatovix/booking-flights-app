'use strict';
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(5).max(100).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().min(6).max(30).required(),
  repeatPassword: Joi.ref('password'),
  avatar: Joi.string().max(255).allow(''),
  bio: Joi.string().max(255).allow(''),
});

module.exports = { registerSchema };

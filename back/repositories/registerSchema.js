'use strict';

const Joi = require('joi');

const registerSchema = Joi.object({
  avatar: Joi.string().max(255).allow(''),
  bio: Joi.string().max(255).allow(''),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().min(6).max(30).required(),
  repeatPassword: Joi.ref('password'),
  username: Joi.string().min(5).max(100).required(),
});

module.exports = { registerSchema };

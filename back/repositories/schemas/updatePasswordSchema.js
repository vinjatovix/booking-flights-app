'use strict';
const Joi = require('joi');

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  newPassword: Joi.string().min(6).max(30).required(),
  repeatNewPassword: Joi.ref('newPassword'),
});
exports.updatePasswordSchema = updatePasswordSchema;

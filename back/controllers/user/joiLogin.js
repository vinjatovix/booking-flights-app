'use strict';
const Joi = require('joi');

async function joiLogin(req) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  await loginSchema.validateAsync(req.body);
  return true;
}
exports.joiLogin = joiLogin;

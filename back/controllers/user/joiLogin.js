'use strict';
const Joi = require('joi');

/**
 * Validates the login request against the joi schema
 *
 * @param {*} req
 */
async function joiLogin(req) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  await loginSchema.validateAsync(req.body);
  return true;
}
exports.joiLogin = joiLogin;

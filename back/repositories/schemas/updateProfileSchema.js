'use strict';
const Joi = require('joi');

const updateProfileSchema = Joi.object({
  username: Joi.string().min(5).max(100).required(),
  bio: Joi.string().max(255).required().allow(''),
});
exports.updateProfileSchema = updateProfileSchema;

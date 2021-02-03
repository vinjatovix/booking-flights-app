'use strict';
const Joi = require('joi');

const updateSchema = Joi.object({
  username: Joi.string().min(5).max(100).required(),
  bio: Joi.string().max(255).required().allow(''),
  photo: Joi.string().required().allow(''),
});
exports.updateSchema = updateSchema;

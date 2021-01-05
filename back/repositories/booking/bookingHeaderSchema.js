'use strict';
const Joi = require('joi');

const bookingHeaderSchema = Joi.object({
  RC_UsrID: Joi.number().required(),
  RC_base: Joi.number().precision(2).required(),
  RC_total: Joi.number().precision(2).required(),
  adults: Joi.number().required(),
});
exports.bookingHeaderSchema = bookingHeaderSchema;

'use strict';
const Joi = require('joi');

/**
 * This is the validation schema for ReservaCabeceras
 */
const bookingHeaderSchema = Joi.object({
  RC_adults: Joi.number().required(),
  RC_base: Joi.number().precision(2).required(),
  RC_total: Joi.number().precision(2).required(),
  RC_UsrID: Joi.number().required(),
});
module.exports = { bookingHeaderSchema };

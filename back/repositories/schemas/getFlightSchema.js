'use strict';
const Joi = require('joi');

const getFlightSchema = Joi.object({
  originLocationCode: Joi.string().min(3).max(3).required(),
  destinationLocationCode: Joi.string().min(3).max(3).required(),
  departureDate: Joi.date().iso().required(),
  returnDate: Joi.date().iso().allow(''),
  adults: Joi.number().min(1).max(9).required(),
  nonStop: Joi.boolean(),
});
module.exports = { getFlightSchema };

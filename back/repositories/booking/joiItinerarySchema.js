'use strict';
const Joi = require('joi');

/** @type {Object} "Schema for validate data to introduce to Vuelos in Database" */
const itinerarySchema = Joi.object({
  origenID: Joi.number().required(),
  destinoID: Joi.number().required(),
  operatingCmp_ID: Joi.number().required(),
  horaSalida: Joi.string().min(19).max(19).required(),
  horaLlegada: Joi.string().min(19).max(19).required(),
  duracion: Joi.string().min(4).max(12).required(),
});
module.exports = { itinerarySchema };

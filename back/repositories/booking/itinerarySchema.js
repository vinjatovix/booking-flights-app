'use strict';
const Joi = require('joi');

/** @type {Object} "Schema for validate data to introduce to Vuelos in Database" */
const itinerarySchema = Joi.object({
  Vue_origenID: Joi.number().required(),
  Vue_destinoID: Joi.number().required(),
  Vue_companyID: Joi.number().required(),
  Vue_aircraft: Joi.string().required(),
  Vue_horaSalida: Joi.string().min(19).max(19).required(),
  Vue_horaLlegada: Joi.string().min(19).max(19).required(),
  Vue_duracion: Joi.string().min(4).max(12).required(),
  Vue_paradas: Joi.number().required(),
});
module.exports = { itinerarySchema };

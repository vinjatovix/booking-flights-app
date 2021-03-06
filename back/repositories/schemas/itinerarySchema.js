'use strict';
const Joi = require('joi');

const itinerarySchema = Joi.object({
  Vue_aircraft: Joi.string().required(),
  Vue_company: Joi.string().required(),
  Vue_companyID: Joi.number().required(),
  Vue_destino: Joi.string().max(3).required(),
  Vue_destinoLoca: Joi.string(),
  Vue_destinoID: Joi.number().required(),
  Vue_duracion: Joi.string().min(4).max(12).required(),
  Vue_horaLlegada: Joi.string().min(19).max(19).required(),
  Vue_horaSalida: Joi.string().min(19).max(19).required(),
  Vue_origen: Joi.string().max(3).required(),
  Vue_origenLoca: Joi.string(),
  Vue_origenID: Joi.number().required(),
  Vue_paradas: Joi.number().required(),
});
module.exports = { itinerarySchema };

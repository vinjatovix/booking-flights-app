'use strict';
const Joi = require('joi');
const path = require('path');
const { fetchAmadeus } = require('./fetchAmadeus');

/**
 * This is the fisrt function to search flighs on amadeus
 *
 * @param {FormData} req
 * @param {Object} res
 * @param {*} next
 */
async function getFlight(req, res, next) {
  try {
    //? VALIDATION
    const searchSchema = Joi.object({
      originLocationCode: Joi.string().min(3).max(3).required(),
      destinationLocationCode: Joi.string().min(3).max(3).required(),
      departureDate: Joi.date().iso().required(),
      returnDate: Joi.date().iso(),
      adults: Joi.number().required(),
      nonStop: Joi.boolean(),
    });
    await searchSchema.validateAsync(req.body);

    //? API CONNECTION
    const initialApiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, nonStop } = req.body;
    const finalUrl = `${initialApiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}`;
    const { data } = await fetchAmadeus(finalUrl, next);

    res.status(200).send(data);
  } catch (error) {
    if (!error.file) {
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { getFlight };

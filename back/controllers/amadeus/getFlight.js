'use strict';
const Joi = require('joi');
const path = require('path');
const { fetchAmadeus } = require('./fetchAmadeus');
const { validAirport, getMiliseconds } = require('../../repositories/booking-repository');

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
      adults: Joi.number().greater(0).required(),
      nonStop: Joi.boolean(),
    });
    await searchSchema.validateAsync(req.body);
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = req.body;
    const nonStop = req.body.nonStop === undefined ? false : true;

    const airport1 = validAirport(originLocationCode);
    const airport2 = validAirport(destinationLocationCode);

    if (airport1 !== true || airport2 !== true) {
      throw new Error('Please choose a valid airport');
    }

    const date1 = getMiliseconds(departureDate);
    const date2 = getMiliseconds(returnDate);
    const date = new Date();
    const dateNow = getMiliseconds(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    if (date1 < dateNow) {
      throw new Error('Choose an available date');
    }

    // Comprobar cuando se distinga de ida o ida y vuelta comprobar si funciona esta validación
    if (date2 && date2 < date1) {
      throw new Error('Choose an available date. Return date cannot be earlier than the date of origin');
    }

    //? API CONNECTION
    const initialApiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
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

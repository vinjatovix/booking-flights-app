'use strict';
const Joi = require('joi');
const path = require('path');
const { fetchAmadeus } = require('./fetchAmadeus');
const { getMiliseconds } = require('../../repositories/booking-repository');
const { airportID } = require('../booking/airportID');
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
    const nonStop = req.body.nonStop === undefined ? false : req.body.nonStop;
    const airport1 = await airportID(originLocationCode);
    const airport2 = await airportID(destinationLocationCode);

    if (!(airport1 || airport2)) {
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
    const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const url = `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}&max=250`;
    const { data } = await fetchAmadeus(url, next);
    if (!data || data.length === 0) {
      return res.status(200).json({
        ok: true,
        data: 'No Flights avaibles for that search, please try another settings',
      });
    }
    res.status(200).send(data);
  } catch (error) {
    if (!error.file) {
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { getFlight };

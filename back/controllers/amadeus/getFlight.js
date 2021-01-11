'use strict';
const Joi = require('joi');
const path = require('path');
const { fetchAmadeus } = require('./fetchAmadeus');
const { getMiliseconds } = require('../../repositories/booking-repository');
const { airportID } = require('../booking/airportID');
const { wait } = require('../utils/wait');
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
      returnDate: Joi.date().iso().allow(''),
      adults: Joi.number().min(1).max(9).required(),
      nonStop: Joi.boolean(),
    });
    await searchSchema.validateAsync(req.body);
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = req.body;
    const nonStop = req.body.nonStop === undefined ? false : req.body.nonStop;
    const airport1 = await airportID(originLocationCode, next);
    const airport2 = await airportID(destinationLocationCode, next);

    if (!(airport1 || airport2)) {
      throw new Error('Please choose a valid airport');
    }

    const date1 = getMiliseconds(departureDate);
    const date2 = getMiliseconds(returnDate);
    const date = new Date();
    const dateNow = getMiliseconds(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    if (date1 < dateNow) {
      const error = new Error();
      error.code = 400;
      error.details = 'Choose an available date';
      next(error);
    }

    // Comprobar cuando se distinga de ida o ida y vuelta comprobar si funciona esta validación
    if (date2 && date2 < date1) {
      const error = new Error();
      error.code = 400;
      error.details = 'Choose an available date. Return date cannot be earlier than the date of origin';
      next(error);
    }
    //? API CONNECTION
    const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    let url;
    if (!req.body.returnDate) {
      url = `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonStop}&max=250`;
    } else {
      url = `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}&max=250`;
    }
    await wait(1500);
    const { data } = await fetchAmadeus(url, next);
    if (!data || data.length === 0) {
      return res.status(200).json({
        ok: true,
        data: 'No Flights avaibles for that search, please try another settings',
      });
    }
    const response = { adults, data };
    res.status(200).json(response);
  } catch (error) {
    if (!error.file) {
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { getFlight };

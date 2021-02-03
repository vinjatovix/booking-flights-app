'use strict';

const { airportID } = require('../booking/airportID');
const { fetchAmadeus } = require('./fetchAmadeus');
const { getFlightSchema } = require('../../repositories/schemas/getFlightSchema');
const { makeQueryUrl } = require('./makeQueryUrl');
const { validateDates } = require('../utils/validateDates');
// const { wait } = require('../utils/wait');
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
    await getFlightSchema.validateAsync(req.body);
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = req.body;
    const nonStop = req.body.nonStop === undefined ? false : req.body.nonStop;
    airportID(originLocationCode, next);
    airportID(destinationLocationCode, next);
    validateDates(departureDate, returnDate, next);

    //? API CONNECTION
    const url = makeQueryUrl({
      req,
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      nonStop,
    });
    // await wait(500);
    const { data } = await fetchAmadeus(url, next);
    if (!data || data.length === 0) {
      return res.status(200).json({
        ok: true,
        data: 'No hay vuelos disponibles para esos ajustes, por favor prueba otros.',
      });
    }

    const response = { adults, data };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { getFlight };

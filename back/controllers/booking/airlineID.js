'use strict';
const path = require('path');
const locationRepository = require('../../repositories/location/location-repository');
const { getAirlineId } = require('../location/getAirlineId');

/**
 *  Returns an airline id for a given IATA code
 *
 * @param {String} iata "2 chars code"
 * @param {*} next
 * @return {Number}
 */
async function airlineID(iata, next) {
  try {
    const existingAirline = await locationRepository.getAirlineByIATA(iata);
    const airlineId = await getAirlineId(existingAirline, iata, next);
    if (!airlineId || airlineId.length === 0) {
      const error = new Error();
      error.code = 500;
      error.file = path.basename(__filename);
      error.details = 'Error fetching Airline';
      next(error);
    }
    return airlineId;
  } catch (error) {
    next(error);
  }
}
module.exports = { airlineID };

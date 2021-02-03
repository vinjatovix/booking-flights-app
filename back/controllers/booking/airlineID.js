'use strict';
const { getAirlineByIATA } = require('../../repositories/location/location-repository');
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
    const existingAirline = await getAirlineByIATA(iata);
    const airlineId = await getAirlineId(existingAirline, iata, next);
    if (!airlineId || airlineId.length === 0) {
      throw new Error();
    }
    return airlineId;
  } catch (err) {
    err.code = err.code || 503;
    err.details = err.details || 'Error obteniendo aerolínea';
    next(err);
  }
}
module.exports = { airlineID };

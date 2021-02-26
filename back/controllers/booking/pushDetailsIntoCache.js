'use strict';

const { datosItinerario } = require('./datosItinerario');

/**
 * Stores itinerary data and returns cache
 * @param {String} itineraryType "ida || vuelta"
 * @param {Object} bookingCache
 * @param {Object} req "Original request"
 * @param {*} next
 */
async function pushDetailsIntoCache(itineraryType, { header, details }, req, next) {
  if (!['ida', 'vuelta'].includes(itineraryType)) {
    const err = new Error();
    err.code = 403;
    err.details = `${itineraryType} no es un itinerario válido`;
    next(err);
  }

  const { RC_ID } = header;
  const itineraryData = await datosItinerario(RC_ID, itineraryType, req, next);

  details[`${itineraryType}`] = itineraryData[`${itineraryType}`];

  return details;
}

module.exports = { pushDetailsIntoCache };

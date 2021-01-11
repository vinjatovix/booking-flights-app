'use strict';

const { datosItinerario } = require('./datosItinerario');

/**
 * Stores itinerary data and returns cache
 * @param {String} itineraryType "ida || vuelta"
 * @param {Object} bookingCache
 * @param {Object} req "Original request"
 * @param {*} next
 */
async function pushDetailsIntoCache(itineraryType, bookingCache, req, next) {
  if (!['ida', 'vuelta'].includes(itineraryType)) {
    const error = new Error();
    error.code = 403;
    error.details = `${itineraryType} is not a valid itinerary`;
    next(error);
  }

  const { RC_ID } = bookingCache.header;
  const itineraryData = await datosItinerario(RC_ID, itineraryType, req, next);

  bookingCache.details[`${itineraryType}`] = itineraryData[`${itineraryType}`];

  return bookingCache.details;
}

module.exports = { pushDetailsIntoCache };

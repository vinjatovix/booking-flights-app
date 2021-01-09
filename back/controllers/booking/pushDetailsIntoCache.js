'use strict';
3;
const { datosItinerario } = require('./datosItinerario');

/**
 * Stores itinerary data and returns cache
 * @param {String} itinerary "ida || vuelta"
 * @param {*} bookingCache
 * @param {*} req
 * @param {*} next
 */
async function pushDetailsIntoCache(itinerary, bookingCache, req, next) {
  if (!['ida', 'vuelta'].includes(itinerary)) {
    const error = new Error();
    error.code = 403;
    error.details = `${itinerary} is not a valid itinerary`;
    next(error);
  }

  const { RC_ID } = bookingCache.header;
  const itineraryData = await datosItinerario(RC_ID, itinerary, req, next);

  bookingCache.details[`${itinerary}`] = itineraryData[`${itinerary}`];

  return bookingCache.details;
}

module.exports = { pushDetailsIntoCache };

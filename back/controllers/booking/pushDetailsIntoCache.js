'use strict';
3;
const { datosItinerario } = require('./datosItinerario');

/**
 * Stores itinerary data and returns cache
 * @param {String} itinerarie "ida || vuelta"
 * @param {*} bookingCache
 * @param {*} req
 * @param {*} next
 */
async function pushDetailsIntoCache(itinerarie, bookingCache, req, next) {
  const { RC_ID } = bookingCache.header;
  const itineraryData = await datosItinerario(RC_ID, itinerarie, req, next);
  bookingCache.details[`${itinerarie}`] = itineraryData[`${itinerarie}`];

  return bookingCache.details;
}

module.exports = { pushDetailsIntoCache };

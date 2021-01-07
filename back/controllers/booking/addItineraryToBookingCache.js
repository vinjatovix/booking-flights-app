'use strict';
const { validateReturn } = require('../utils/validateReturn');
const { setItineraryType } = require('./setItineraryType');

/**
 * Adds an itinerary to the booking cache
 *
 * @param {Object} bookingCache
 * @param {Object} itineraryObject "Receives an object with itinerary data"
 * @param {String} itineraryType "'ida' || 'vuelta'"
 * @return {Object} "Updated Cache"
 */
async function addItineraryToBookingCache(bookingCache, itineraryObject, itineraryType) {
  const itinerary = await setItineraryType(itineraryType);
  console.log('OBJETO ITINERARIO !!!!!!!!!!!!!!!!! ',itineraryObject);

  bookingCache[`${itinerary}`] = [itineraryObject.paradas];

  return bookingCache;
}
module.exports = { addItineraryToBookingCache };

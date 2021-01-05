'use strict';
const path = require('path');

/**
 * Creates a key object for manipulate
 *
 * @param {String} itineraryType "ida || vuelta"
 * @return {String} "object key"
 */
async function setItineraryType(itineraryType) {
  if (!itineraryType || !['ida', 'vuelta'].includes(itineraryType)) {
    const error = new Error();
    error.code = 400;
    error.details = `Itinerary type '${itineraryType}' not valid, 'ida' or 'vuelta'`;
    error.file = path.basename(__filename);
    throw error;
  }
  const itinerary = itineraryType + 'ToVue';
  return itinerary;
}
module.exports = { setItineraryType };

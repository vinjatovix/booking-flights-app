'use strict';
const path = require('path');

/**
 *  Enters a string a returns a formatted booking object key
 *
 * @param {String} itineraryType
 * @return {String}
 */
function setItineraryType(itineraryType) {
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

'use strict';
/**
 * This function sets the amadeus fetching url for gather airports and cities information.
 *
 * @param {String} type "Enumerates 'AIRPORT' and 'CITY'"
 * @param {String} code "Keyword for search"
 * @return {String} "API url"
 */
const makeAirportInfoUrl = (type, code) => {
  return `https://test.api.amadeus.com/v1/reference-data/locations?subType=${type}&keyword=${code}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
};

module.exports = { makeAirportInfoUrl };

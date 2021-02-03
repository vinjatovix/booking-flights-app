'use strict';

/**
 * Verifies if some data exists
 *
 * @param {Object} req
 * @return {Boolean}
 */
function basicInputDataValidation(req) {
  const { id } = req.auth;
  const { adults, itineraries, price, validatingAirlineCodes } = req.body;
  const error = new Error();

  if (!req.body.adults || req.body.adults <= 0 || req.body.adults >= 10) {
    error.code = 'BADADULTS';
    throw error;
  }
  if (!id) {
    error.code = 'NOID';
    throw error;
  }
  if (!price || !adults || !validatingAirlineCodes) {
    error.code = 'BADFLIGHT';
    throw error;
  }
  if (!itineraries || itineraries.length === 0) {
    error.code = 'BADITINERARY';
    throw error;
  }

  return true;
}
module.exports = { basicInputDataValidation };

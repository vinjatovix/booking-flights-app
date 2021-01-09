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

  if (!id) {
    const error = new Error();
    error.details = 'User ID is required';
    error.code = 403;
    throw error;
  }
  if (!price || !adults || !validatingAirlineCodes) {
    const error = new Error();
    error.code = 400;
    error.details = 'Invalid Flight Data';
    throw error;
  }
  if (!itineraries || itineraries.length === 0) {
    const error = new Error();
    error.code = 400;
    error.details = 'Not valid itinerary found';
    throw error;
  }

  return true;
}
module.exports = { basicInputDataValidation };

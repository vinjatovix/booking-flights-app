'use strict';

/**
 * Verifies if some data exists
 *
 * @param {Object} req
 * @return {Boolean}
 */
function basicInputDataValidation({ auth, body }) {
  const { id } = auth;
  const { adults, itineraries, price, validatingAirlineCodes } = body;
  const err = new Error();

  if (!body.adults || body.adults <= 0 || body.adults >= 10) {
    err.code = 'BADADULTS';
    throw err;
  }
  if (!id) {
    err.code = 'NOID';
    throw err;
  }
  if (!price || !adults || !validatingAirlineCodes) {
    err.code = 'BADFLIGHT';
    throw err;
  }
  if (!itineraries || itineraries.length === 0) {
    err.code = 'BADITINERARY';
    throw err;
  }

  return true;
}
module.exports = { basicInputDataValidation };

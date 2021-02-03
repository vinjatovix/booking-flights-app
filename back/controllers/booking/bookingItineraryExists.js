'use strict';

/**
 * Throws error if data is invalid
 *
 * @param {*} req
 * @param {Number} i "0 || 1"
 * @param {*} next
 * @return {true}
 */
function bookingItineraryExists({ body }, i, next) {
  if (!body.itineraries[i] || body.itineraries.length === 0) {
    const err = new Error();
    err.code = 400;
    err.details = 'Estás intentando gestionar un viaje y no existe.';
    next(err);
  }
  return true;
}
module.exports = { bookingItineraryExists };

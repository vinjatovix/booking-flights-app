const path = require('path');

/**
 * Throws error if data is invalid
 *
 * @param {*} req
 * @param {Number} i "0 || 1"
 * @param {*} next
 * @return {true}
 */
function bookingItineraryExists(req, i, next) {
  if (!req.body.itineraries[i] || req.body.itineraries.length === 0) {
    const error = new Error();
    error.code = 400;
    error.details = "Estás intentando gestionar un viaje y no existe.";
    next(error);
  }
  return true;
}
module.exports = { bookingItineraryExists };

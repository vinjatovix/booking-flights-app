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
    error.details = "You are trying to manage travel and there isn't";
    error.file = path.basename(__filename);
    next(error);
  }
  return true;
}
module.exports = { bookingItineraryExists };

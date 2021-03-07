'use strict';

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

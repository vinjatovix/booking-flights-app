'use strict';

const { createBookingSegments } = require('./createBookingSegments');
const { itinerarySchema } = require('../../repositories/schemas/itinerarySchema');
const { storeBookingSegment } = require('./storeBookingSegment');

/**
 * For a given booking header id and itineraryType creates booking details
 *
 * @param {Number} RC_ID "This is the booking header number"
 * @param {String} itineraryType "ida || vuelta"
 * @param {Object} req "Original request"
 * @param {*} next
 */
async function datosItinerario(RC_ID, itineraryType, req, next) {
  try {
    const i = itineraryType === 'vuelta' ? 1 : 0;
    

    const bookingItinerary = req.body.itineraries[i].segments;

    const bookingSegments = await createBookingSegments(bookingItinerary, next);

    for (const segment of bookingSegments) {
      await itinerarySchema.validateAsync(segment);
      await storeBookingSegment({segment, itineraryType, RC_ID, next});
    }

    return { [`${itineraryType}`]: bookingSegments };
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.code = 400;
    }
    //TODO: mover a winston
    err.code = err.code || 400;
    err.details = err.details || 'Itinerario inválido o mal formateado';
    next(err);
  }
}
module.exports = { datosItinerario };

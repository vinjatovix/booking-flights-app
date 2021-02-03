'use strict';

const { createBookingSegments } = require('./createBookingSegments');
const { itinerarySchema } = require('../../repositories/schemas/itinerarySchema');
const path = require('path');
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
      await storeBookingSegment(segment, itineraryType, RC_ID, next);
    }

    return { [`${itineraryType}`]: bookingSegments };
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    error.code = error.code || 400;
    error.details = error.details || 'Itinerario inválido o mal formateado';
    next(error);
  }
}
module.exports = { datosItinerario };

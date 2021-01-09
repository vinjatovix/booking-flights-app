const path = require('path');
const { itinerarySchema } = require('../../repositories/booking/booking-repository');
const { createBookingSegments } = require('./createBookingSegments');
const { storeBookingSegment } = require('./storeBookingSegment');
/**
 * For a given booking header id and itineraryType creates booking details
 *
 * @param {Number} RC_ID
 * @param {String} itineraryType "ida || vuelta"
 * @param {*} req
 * @param {*} next
 */
async function datosItinerario(RC_ID, itineraryType, req, next) {
  try {
    const i = itineraryType === 'vuelta' ? 1 : 0;

    const bookingItinerary = req.body.itineraries[i].segments;
    let bookingSegments = await createBookingSegments(bookingItinerary, next);

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
    error.code = error.code || 500;
    error.details = error.details || 'Unknown error with datosItinerario';
    next(error);
  }
}
module.exports = { datosItinerario };

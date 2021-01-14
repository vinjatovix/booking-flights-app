const { itinerarySchema } = require('../../repositories/booking/booking-repository');
const { bookingItineraryExists } = require('./bookingItineraryExists');
const { createBookingSegments } = require('./createBookingSegments');
const { storeBookingSegment } = require('./storeBookingSegment');

/**
 * For a given booking header id and itineraryType creates booking details
 *
 * @param {Number} RC_ID
 * @param {String} itineraryType "ida || vuelta"
 * @param {*} req
 * @param {*} next
 * @return {Object}
 */
async function datosItinerario(RC_ID, itineraryType, req, next) {
  try {
    const i = itineraryType === 'vuelta' ? 1 : 0;

    bookingItineraryExists(req, i, next);

    const bookingItinerary = req.body.itineraries[i].segments;
    let bookingSegments = await createBookingSegments(bookingItinerary);

    for (const segment of bookingSegments) {
      await itinerarySchema.validateAsync(segment);
      await storeBookingSegment(segment, itineraryType, RC_ID);
    }

    return { [`${itineraryType}`]: bookingSegments };
  } catch (err) {
    next(err);
  }
}
module.exports = { datosItinerario };

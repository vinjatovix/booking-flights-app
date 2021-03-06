'use strict';

const { createBookingSegments } = require('./createBookingSegments');
const { itinerarySchema } = require('../../repositories/schemas/itinerarySchema');
const { storeBookingSegment } = require('./storeBookingSegment');

async function datosItinerario(RC_ID, itineraryType, req, next) {
  try {
    const i = itineraryType === 'vuelta' ? 1 : 0;
    const bookingItinerary = req.body.itineraries[i].segments;
    const bookingSegments = await createBookingSegments(bookingItinerary, next);

    for (const segment of bookingSegments) {
      await itinerarySchema.validateAsync(segment);
      await storeBookingSegment({ segment, itineraryType, RC_ID, next });
    }

    return { [`${itineraryType}`]: bookingSegments };
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.code = 400;
    }
    err.code = err.code || 400;
    err.details = err.message || err.details || 'Itinerario inválido o mal formateado';
    next(err);
  }
}
module.exports = { datosItinerario };

const { createBookingDetail, createFlight } = require('../../repositories/booking/booking-repository');

/**
 *  Stores the given segment in DB and Updates bookingCache Data
 * @param {*} segment
 * @param {*} itineraryType
 * @param {*} RC_ID
 */

async function storeBookingSegment({segment, itineraryType, RC_ID, next}) {
  const Vue_ID = await createFlight(segment, next);
  const RD_direccion = itineraryType === 'vuelta' ? 1 : 0;
  const RD_ID = await createBookingDetail(Vue_ID, RC_ID, RD_direccion, next);
  segment.Vue_ID = Vue_ID;
  segment.RD_ID = RD_ID;
}
module.exports = { storeBookingSegment };

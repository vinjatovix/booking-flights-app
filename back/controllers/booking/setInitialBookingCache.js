'use strict';

/**
 * Fills the booking header with initial properties
 * @param {*} req
 */
function setInitialBookingCache({ auth, body }) {
  return {
    header: {
      RC_UsrID: +auth.id,
      RC_base: +body.price.base,
      RC_total: +body.price.grandTotal,
      RC_adults: +body.adults,
    },
    details: {
      ida: [],
      vuelta: [],
    },
  };
}
module.exports = { setInitialBookingCache };

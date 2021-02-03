'use strict';

/**
 * Fills the booking header with initial properties
 * @param {*} req
 */
function setInitialBookingCache(req) {
  return {
    header: {
      RC_UsrID: +req.auth.id,
      RC_base: +req.body.price.base,
      RC_total: +req.body.price.grandTotal,
      RC_adults: +req.body.adults,
    },
    details: {
      ida: [],
      vuelta: [],
    },
  };
}
module.exports = { setInitialBookingCache };

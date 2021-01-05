'use strict';
function setInitialBookingCache(req, adults) {
  return {
    header: {
      RC_UsrID: req.auth.id,
      RC_base: +req.body.price.base,
      RC_total: +(req.body.price.grandTotal * adults).toFixed(2),
      adults,
    },
    details: [],
    idaToVue: {},
    vueltaToVue: {},
  };
}
exports.setInitialBookingCache = setInitialBookingCache;

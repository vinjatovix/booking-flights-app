'use strict';

const { getAirlineByIATA } = require('../../repositories/location/getAirlineByIATA');

/**
 * Fills the booking header with initial properties
 * @param {*} req
 */
async function setInitialBookingCache({ auth, body }) {
  const [aerolineaIda] = await getAirlineByIATA(body.itineraries[0].segments[0].carrierCode);
  const [aerolineaVuelta] = await getAirlineByIATA(
    body.itineraries[1].segments[body.itineraries[1].segments.length - 1].carrierCode
  );
  console.log(aerolineaVuelta);
  return {
    header: {
      RC_UsrID: +auth.id,
      RC_base: +body.price.base,
      RC_total: +body.price.grandTotal,
      RC_adults: +body.adults,
      username: auth.username,
      email: auth.email,
      duracionIda: body.itineraries[0].duration,
      aerolineaIda: aerolineaIda.Cmp_nombre,
      aerolineaVuelta: aerolineaVuelta.Cmp_nombre || '',
      duracionVuelta: body.itineraries[1].duration || '',
    },
    details: {
      ida: [],
      vuelta: [],
    },
  };
}
module.exports = { setInitialBookingCache };

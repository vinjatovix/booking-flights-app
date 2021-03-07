'use strict';

const { getAirlineByIATA } = require('../../repositories/location/getAirlineByIATA');
const { getAirlineId } = require('../location/getAirlineId');

async function setInitialBookingCache({ auth, body }) {
  await getAirlineId(false, body.itineraries[0].segments[0].carrierCode, console.log);
  const [aerolineaIda] = await getAirlineByIATA(body.itineraries[0].segments[0].carrierCode);

  let aerolineaVuelta;

  if (body.itineraries[1]) {
    await getAirlineId(false, body.itineraries[0].segments[0].carrierCode, console.log);
    [aerolineaVuelta] = await getAirlineByIATA(
      body.itineraries[1].segments[body.itineraries[1].segments.length - 1].carrierCode
    );
  }

  const cmpVuelta = aerolineaVuelta ? aerolineaVuelta.Cmp_nombre : null;
  const durVuelta = body.itineraries[1] ? body.itineraries[1].duration : null;

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
      aerolineaVuelta: cmpVuelta || '',
      duracionVuelta: durVuelta || '',
    },
    details: {
      ida: [],
      vuelta: [],
    },
  };
}
module.exports = { setInitialBookingCache };

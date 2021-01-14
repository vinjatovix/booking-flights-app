const { airportID } = require('./airportID');
const { airlineID } = require('./airlineID');

/**
 * For a given itinerary creates segment data values
 *
 * @param {*} itineraryObject
 * @return {*}
 */

async function createBookingSegments(itineraryObject) {
  let bookingSegments = [];
  for (const segment of itineraryObject) {
    bookingSegments.push({
      Vue_origenID: await airportID(segment.departure.iataCode),
      Vue_destinoID: await airportID(segment.arrival.iataCode),
      Vue_companyID: await airlineID(segment.operating.carrierCode),
      Vue_aircraft: segment.aircraft.code,
      Vue_horaSalida: segment.departure.at,
      Vue_horaLlegada: segment.arrival.at,
      Vue_duracion: segment.duration,
      Vue_paradas: segment.numberOfStops,
    });
  }
  return bookingSegments;
}
module.exports = { createBookingSegments };
